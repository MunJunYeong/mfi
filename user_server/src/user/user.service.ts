import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo';
import { MailService } from '../lib/common/mail/mail.service';
import { Auth } from '../auth/entities/auth.entity';
import { UserToken } from '../user-token/entities/user-token.entity';
import { LoginUserTokenDTO } from './dto/args/signIn-userToken.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../lib/common/jwt';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepo, private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ){}

  async getUserList(page: number, nickName: string) {
    console.log(page)
    let user : User = new User;
    return user;
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

  async signIn(id: string, pw: string, isForce: boolean) {
    let user:User = new User();
    try{
      user = await this.userRepo.findUserById(id);
    }catch(err){

    }
    if(isForce === false){
      if(user === null) throw new Error('잘못된 아이디!!!!');
      if(await bcrypt.compare(pw, user.pw) === false) throw new Error('잘못된 비밀번호!!!!');
      let isLogin: boolean = false;
      try{
        const userToken = await this.userRepo.findUserToken(user.userIdx);
        userToken.token === '' ? isLogin = false : isLogin = true;
      }catch(err){
        
      }
      if(isLogin === true){
        throw new Error('이미 로그인 중입니다!!!!');//이거에 대한 추가 핸들링 추가하기
      }
    }

    let accessToken: string, refreshToken: string;
    try{
      user.pw = '';
      console.log(user)
      const accessUser: object = {
        ...user
      };
      const refreshUser: object = {
        userIdx : user.userIdx,
        refresh : true
      };
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
    const loginUserToken: LoginUserTokenDTO = {
      token : accessToken,
      refreshToken : refreshToken
    }
    return loginUserToken;
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
      throw new Error('중복됨!!!!');
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
    // if(res === null) throw new Error();
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
