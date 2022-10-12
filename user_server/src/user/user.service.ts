import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo';
// import {v4 as uuidv4} from 'uuid';
import { MailService } from '../mail/mail.service';
import { Auth } from '../auth/entities/auth.entity';
import jwtUtils from '../lib/common/jwtUtils';
import { UserToken } from '../user-token/entities/user-token.entity';
import { UserTokenDTO } from './dto/args/signIn-userToken.dto';
@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo, private readonly mailService: MailService){}


  async signIn(id: string, pw: string) {
    let user:User = new User();
    try{
      user = await this.userRepo.findUserById(id);
    }catch(err){

    }
    if(user === null) throw new Error('잘못된 아이디!!!!');
    if(user.pw !== pw) throw new Error('잘못된 비밀번호!!!!');
    let isLogin: boolean = false;
    try{
      const userToken = await this.userRepo.findUserToken(user.userIdx);
      userToken.token === '' ? isLogin = false : isLogin = true;
    }catch(err){

    }
    if(isLogin === true){
      throw new Error('이미 로그인 중입니다!!!!');//이거에 대한 추가 핸들링 추가하기
    }
    let accessToken: string, refreshToken: string;
    try{
      user.pw = '';
      jwtUtils.sign(user);
      console.log(accessToken)
      refreshToken = jwtUtils.refresh();
      const userToken: UserToken = {
        userIdx : user.userIdx,
        token : accessToken
      }
      await this.userRepo.saveUserToken(userToken);
    }catch(err){

    }
    const userToken: UserTokenDTO = {
      token : accessToken,
      refreshToken : refreshToken
    } 
    return user;
  }

  async updatePw(email: string, pw: string) {
    let user:User = new User();
    try{
      user = await this.userRepo.findUserByEmail(email);
      user.pw = pw;
      user = await this.userRepo.save(user);
    }catch(err){
      console.log(err);
    }
    return user;
  }
  async checkAuth(email: string, no: string) {
    // 1. authentication에 와있는 인증번호를 확인한다.
    let auth: Auth[] = [];
    try{
      auth = await this.userRepo.findAuth(email);
    }catch(err){

    }
    if(auth[auth.length-1].no !== no){
      throw new Error('잘못된 인증번호!!!!!');
    }
    try{
      await this.userRepo.deleteAuthByEmail(email);
    }catch(err){
      
    }
    let user: User = new User();
    user.email = email;
    return user;
  }

  // 일치하는 email 확인 후 -> id mail 전송.
  async sendIdMail(email: string) {
    let user:User = new User();
    try{
      user = await this.validateMail(email, true);
    }catch(err){
      
    }
    if(user === null){
      throw new Error('잘못된 email');
    }
    const tempId: string = user.id.substring(0, user.id.length-3);
    this.mailService.idMail( (tempId+'***') , email);
    return user;
  }
  // 일치하는 email 확인 후 -> 인증번호 전송
  async sendPwMail(email: string) {
    let user:User = new User();
    try{
      user = await this.validateMail(email, true);
    }catch(err){
      
    }
    if(user === null){
      throw new Error('잘못된 email');
    }
    try{
      const no: string = this.mailService.authenticationMail(email);
      let authentication:Auth = new Auth();
      authentication.email = email;
      authentication.no = no;
      await this.userRepo.saveAuth(authentication);
    }catch(err){

    }
    return user;
  }
  // 회원가입시 이메일 중복확인을 위한 mail 전송
  async sendMail(email: string) {
    let user:User = new User();
    try{
      user = await this.validateMail(email, false);
    }catch(err){
      
    }
    if(user !== null){
      throw new Error('잘못된 email');
    }
    
    // 이메일을 보내고 이메일에 해당하는 인증번호 저장
    try{
      const no: string = this.mailService.authenticationMail(email);
      let authentication:Auth = new Auth();
      authentication.email = email;
      authentication.no = no;
      await this.userRepo.saveAuth(authentication);
    }catch(err){

    }
    // 체크해주려면 이렇게 반환해서 . 어떻게 반환해야 오류가 안나는지 모르겠음 아직
    return user;
  }

  async signUp(id, pw, email, nickName) {
    //중복 아이디, 이메일, 닉네임 확인
    let duplicatedId: boolean, duplicatedNickName: boolean, duplicatedEmail: boolean;
    try{
      await this.userRepo.findUserById(id) === null? duplicatedId = false : duplicatedId = true;
      await this.userRepo.findUserByNickName(nickName) === null? duplicatedNickName = false : duplicatedNickName = true;
      await this.userRepo.findUserByEmail(email) === null? duplicatedEmail = false : duplicatedEmail = true;
    }catch(err){

    }
    if(duplicatedId || duplicatedNickName || duplicatedEmail){
      throw new Error();
    }
    //user 정보 설정
    const user: User = new User();
    user.id = id;
    user.pw = pw;
    user.nickName = nickName;
    user.email = email;
    user.role = "normal";
    // const user: User = {
    //   userIdx: 120,
    //   created : new Date(),
    //   status : '',
    //   role : "normal",
    //   ...createUserInput
    // };
    let res:User;
    try{
      res = await this.userRepo.signUp(user); //transaction 유저, 유저토큰 저장 repo에서
    }catch(err){

    }
    if(res === null) throw new Error();
    return res;
  }
//중복여부 : 중복(있음) true || 없음 false
  async validateMail(email: string, flag: boolean){
    let existEmail: boolean;
    let user:User = new User;
    try{
      user = await this.userRepo.findUserByEmail(email);
    }catch(err){

    }
    // user === null? existEmail = false : existEmail = true;
    // if(flag !== existEmail){
    //   throw new Error('잘못된 email');
    // }
    return user;
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

}
