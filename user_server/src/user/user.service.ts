import { Inject, Injectable, Scope } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo';
import { MailService } from '../lib/common/mail/mail.service';
import { Auth } from '../auth/entities/auth.entity';
import { UserToken } from '../user-token/entities/user-token.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../lib/common/jwt';
import { IsSuccessObj } from './dto/objs/is-success.obj';
import { DeleteResult } from 'typeorm';
import { LoginTokenObj } from './dto/objs/login-token.obj';
import { getPagination } from '../lib/common/pagination';
import { UserListObj } from './dto/objs/user-list.obj';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';

@Injectable({scope : Scope.REQUEST})
export class UserService {
  
  
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private userRepo: UserRepo, private readonly mailService: MailService,
    private readonly jwtService: JwtService
  ){}

  async signUp(id: string, pw: string, email: string, nickName: string) {
    //중복 아이디, 이메일, 닉네임 확인
    let duplicatedId: boolean, duplicatedNickName: boolean, duplicatedEmail: boolean;
    try{
      await this.userRepo.findUserById(id) === null? duplicatedId = false : duplicatedId = true;
      await this.userRepo.findUserByNickName(nickName) === null? duplicatedNickName = false : duplicatedNickName = true;
      await this.userRepo.findUserByEmail(email) === null? duplicatedEmail = false : duplicatedEmail = true;
    }catch(err){

    }
    if(duplicatedId || duplicatedNickName || duplicatedEmail){
      throw new Error('duplicated');
    }
    //user 정보 설정
    const user: User = new User();
    user.id = id;
    //비밀번호 암호화
    user.pw = await bcrypt.hash(
      pw, 10,
    );
    user.nickName = nickName;
    user.email = email;
    user.role = "normal";
    let res:User;
    try{
      res = await this.userRepo.signUp(user); //transaction 유저, 유저토큰 저장 repo에서
    }catch(err){

    }
    return res;
  }

  async checkNickName(nickName: string) {
    let isSuccessObj: IsSuccessObj = new IsSuccessObj();
    isSuccessObj.isSuccess = false; 
    let user: User = new User();
    try{
      user = await this.userRepo.findUserByNickName(nickName);
    }catch(err){

    }
    if(user === null) isSuccessObj.isSuccess = true;
    return isSuccessObj;
  }
  async checkId(id: string) {
    let isSuccessObj: IsSuccessObj = new IsSuccessObj();
    isSuccessObj.isSuccess = false; 
    let user: User = new User();
    try{
      user = await this.userRepo.findUserById(id);
    }catch(err){

    }
    if(user === null) isSuccessObj.isSuccess = true;
    return isSuccessObj;
  }
  async checkEmail(email: any) {
    let isSuccessObj: IsSuccessObj = new IsSuccessObj();
    isSuccessObj.isSuccess = false; 
    let user: User = new User();
    try{
      user = await this.userRepo.findUserByEmail(email);
    }catch(err){

    }
    if(user === null) isSuccessObj.isSuccess = true;
    return isSuccessObj;
    }
  // 회원가입시 이메일 중복확인을 위한 mail 전송
  async sendMail(email: string) {
    let user:User = new User();
    try{
      user = await this.validateMail(email);
    }catch(err){
      throw new Error(err);
    }
    if(user !== null){
      throw new Error('exist email');
    }
    let auth: Auth;
    let isSuccessObj: IsSuccessObj = new IsSuccessObj();
    try{
      auth = await this.saveMailAuth(email);
      if(auth === null) isSuccessObj.isSuccess = false;
      else isSuccessObj.isSuccess = true;
    }catch(err){

    }
    return isSuccessObj;
  }
  // 일치하는 email 확인 후 -> 인증번호 전송
  async sendPwMail(email: string, id: string) {
    let user:User;
    try{
      user = await this.validateMail(email);
    }catch(err){
      
    }
    if(user === null){
      throw new Error('wrong email');
    }
    if(user.id !== id){
      throw new Error('wrong id');
    }
    let auth: Auth;
    let isSuccessObj: IsSuccessObj= new IsSuccessObj();
    try{
      auth = await this.saveMailAuth(email);
      auth === null ?  isSuccessObj.isSuccess = false : isSuccessObj.isSuccess = true;
    }catch(err){

    }
    return isSuccessObj;
  }
  // 일치하는 email 확인 후 -> id mail 전송.
  async sendIdMail(email: string) {
    let user:User = new User();
    try{
      user = await this.validateMail(email);
    }catch(err){
      
    }
    if(user === null){
      throw new Error('wrong email');
    }
    let isSuccessObj = new IsSuccessObj();
    try{
      const tempId: string = user.id.substring(0, user.id.length-3);
      let res: object = await this.mailService.idMail( (tempId+'***') , email);
      res === null ? isSuccessObj.isSuccess = false : isSuccessObj.isSuccess= true;
    }catch(err){

    }
    return isSuccessObj;
  }
  async testFind(userIdx: number) {
    return await this.userRepo.findOne({
      where : {
       userIdx : userIdx 
      }
    });
  }
  async checkAuth(email: string, no: string) {
    // 1. authentication에 와있는 인증번호를 확인한다.
    let auth: Auth[] = [];
    try{
      auth = await this.userRepo.findAuth(email);
    }catch(err){
      
    }
    if(auth.length === 0 || auth[auth.length-1].no !== no){
      throw new Error('wrong no');
    }
    let res: DeleteResult;
    try{
      res = await this.userRepo.deleteAuthByEmail(email);
    }catch(err){
      
    }
    let isSuccessObj = new IsSuccessObj();
    !res ?  isSuccessObj.isSuccess = false : isSuccessObj.isSuccess= true;
    return isSuccessObj;
  }
  async updatePw(email: string, pw: string) {
    let user:User = new User();
    try{
      user = await this.userRepo.findUserByEmail(email);
    }catch(err){
      console.log(err);
    }
    try{
      user.pw = await bcrypt.hash(
        pw, 10,
      );
      await this.userRepo.update(user.userIdx, user);
    }catch(err){
      console.log(err);
    }
    return user;
  }
  async signIn({ id, pw, isForce }: { id: string, pw: string, isForce: boolean }) {
    let user:User;
    try{
      user = await this.userRepo.findUserById(id);
    }catch(err){

    }
    if(user === null) throw new Error('wrong id');
    //초기 로그인이라면 비밀번호의 검증 절차를 걸치기!
    if(isForce === false){
      if(await bcrypt.compare(pw, user.pw) === false) throw new Error('wrong pw');
      let isLogin: boolean = false;
      try{
        const userToken = await this.userRepo.findUserToken(user.userIdx);
        userToken.token === '' ? isLogin = false : isLogin = true;
      }catch(err){
        
      }
      if(isLogin === true){
        throw new Error('isLogin');//이거에 대한 추가 핸들링 추가하기
      }
    }
    //위에서 확인해줬다고 해도 재확인 필요
    if(await bcrypt.compare(pw, user.pw) === false) throw new Error('wrong pw');
    let accessToken: string, refreshToken: string;
    user.pw = '';
    const accessUser: object = {
      ...user
    };
    const refreshUser: object = {
      userIdx : user.userIdx,
      refresh : true
    };
    try{
      accessToken = await this.jwtService.signAsync(accessUser);
      refreshToken = await this.jwtService.signAsync(refreshUser);
      const userToken: UserToken = {
        userIdx : user.userIdx,
        token : accessToken
      }
      await this.userRepo.updateUserToken(userToken);
    }catch(err){

    }
    // login한 유저한테 access, refresh token을 return 해주어야함.
    const loginUserToken: LoginTokenObj = {
      token : accessToken,
      refreshToken : refreshToken
    }
    return loginUserToken;
  }
  async updateUserToken(userIdx: number, token: string) {
    let userToken:UserToken = new UserToken();
    //try catch 를 하나의 단위마다 해야하는지 ?
    try{
      userToken = await this.userRepo.findUserToken(userIdx);
    }catch(err){

    }
    if(userToken === null) throw new Error("잘못된 접근입니다!!!!!");
    userToken.token = token;
    try{
      await this.userRepo.updateUserToken(userToken);
    }catch(err){

    }
    return userToken;
  }
  async updateUserRole(userIdx: number, role: string) {
    let user:User = new User();
    //try catch 를 하나의 단위마다 해야하는지 ?
    try{
      user = await this.userRepo.findOne({
        where : {
          userIdx : userIdx
        }
      });
    }catch(err){

    }
    if(user === null) throw new Error("잘못된 접근입니다!!!!!");
    user.role = role;
    try{
      await this.userRepo.save(user);
    }catch(err){

    }
    return user;
  }
  async logout(userIdx: number) {
    //로그아웃을 한다는 것은 무조건 유저가 있다는 건데 이것에 대한 처리가 되어야 하는지? 일단 넣어둠
    // repo에서만 해야되는지, repo에서는 user말고 userToken, authentication과 관련된 entity에 접근하기 위해서 존재하긴함
    // user와 관련된 find는 service에서 처리를 해도 되는지?
    let user:User = new User();
    try{
      user = await this.userRepo.findOne({
        where : {
          userIdx : userIdx
        }
      });
    }catch(err){

    }
    if(user === null)throw new Error("잘못된 접근입니다!!!!!");
    let userToken: UserToken = {
      userIdx : userIdx,
      token : ''
    }
    try{
      await this.userRepo.updateUserToken(userToken);
    }catch(err){

    }
    return userToken;
  }
  async getUserList(page: number, nickName: string) {
    const {limit, offset} = getPagination(page);
    let userList: [User[], number];
    try{
      userList = await this.userRepo.getUserList(nickName, limit, offset);
    }catch(err){

    }
    const res: UserListObj = {
      userList : userList[0],
      count : userList[1]
    }
    return res;
  }
  async getUserData(token: String) {
    // req의 req안에 user가 있음. 왜인지 ?
    const user:User = this.req['req'].user; //토큰값에 되어져있는 유저
    let userToken: UserToken = new UserToken(); 
    try{
      userToken = await this.userRepo.findUserToken(user.userIdx);
    }catch(err){
      throw new Error('wrong data');
    }
    if(token !== userToken.token){
      throw new Error('force logout');
    }

    return user;
  }

  async validateToken(token: string) {
    // console.log(token)
    let res: any;
    try{
      res = await this.jwtService.verifyAsync(token);
    }catch(err){
      throw new Error(err.message);
    }
    // catch로 안 빠졌다는 것은 올바른 토큰이란 것
    const isSuccessObj: IsSuccessObj = {
      isSuccess : true
    };
    return isSuccessObj;
  }
  
//중복여부 : 중복(있음) true || 없음 false
  async validateMail(email: string){
    let user:User = new User;
    try{
      user = await this.userRepo.findUserByEmail(email);
    }catch(err){
      console.log(err);
    }
    return user;
  }
  // 메일 전송 후 
  async saveMailAuth(email: string): Promise<Auth>{
    let auth: Auth;
    try{
      const res = await this.mailService.authMail(email);
      let authentication:Auth = new Auth();
      authentication.email = email;
      authentication.no = res['no'];
      auth = await this.userRepo.saveAuth(authentication);
    }catch(err){

    }
    return auth;
  }
}
