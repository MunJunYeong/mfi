import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepo } from './user.repo';
import { JwtService } from '../lib/common/jwt';
import { MailService } from '../lib/common/mail/mail.service';
import { User } from './entities/user.entity';
import { IsSuccessObj } from './dto/objs/is-success.obj';
import { Auth } from '../auth/entities/auth.entity';

class MailServiceMock {
  saveMailAuth(email: string){
    const auth:Auth = new Auth();
    return auth;
  }
  authMail(email: string){
    let res = {
      no : 'aaaaaa'
    }
    return res;
  }
  idMail(id: string, email: string){
    if(email === 'aaa111@naver.com'){
      return email;
    }
    return null;
  }

};

class UserRepoMock {
  findUserById(id: string){
    if(id === 'aaa111'){
      const user = new User();
      return user;
    }
    return null;
  }
  findUserByNickName(nickName: string){
    if(nickName === 'aaa111'){
      const user = new User();
      return user;
    }
    return null;
  }
  findUserByEmail(email: string){
    if(email === 'aaa111@naver.com'){
      const user = new User();
      user.email = email;
      user.id = 'aaa111';
      return user;
    }
    return null;
  }
  signUp(user: User){
    return user;
  }
  saveAuth(authentication: Auth){
    const auth = new Auth();
    return auth;
  }
  
}

describe('UserService', () => {
  let service: UserService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports : [
      ],
      providers: [UserService, {
        provide: UserRepo,
        useClass: UserRepoMock,
      }, {
        provide: MailService,
        useClass: MailServiceMock,
      }, JwtService],
    }).compile();

    service = await module.resolve(UserService);
  });

  it('signUp - happy case#1', async () => {
    const id: string = "bbb111";
    const pw: string = "bbb111";
    const email: string = "bbb111";
    const nickName: string = "bbb111";
    let res: User;
    try{
      res = await service.signUp(id, pw, email, nickName);
    }catch(err){
      console.log(err);
    }
    expect(res).toBeInstanceOf(User);
  });
  it('signUp - unhappy case#1', async () => {
    const id: string = "aaa111";
    const pw: string = "aaa111";
    const email: string = "aaa111";
    const nickName: string = "aaa111";
    let res: User;
    try{
      res = await service.signUp(id, pw, email, nickName);
    }catch(err){
      expect(err.message).toBe('duplicated');
    }
  });

  it('checkNickName - happy case#2', async () => {
    const nickName: string = "bbb111";
    let res:IsSuccessObj;
    try{
      res = await service.checkNickName(nickName);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeTruthy();
  });
  it('checkNickName - unhappy case#2', async () => {
    const nickName: string = "aaa111";
    let res:IsSuccessObj;
    try{
      res = await service.checkNickName(nickName);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeFalsy();
  });
  it('checkId - happy case#3', async () => {
    const id: string = "bbb111";
    let res:IsSuccessObj;
    try{
      res = await service.checkId(id);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeTruthy();
  });
  it('checkId - unhappy case#3', async () => {
    const id: string = "aaa111";
    let res:IsSuccessObj;
    try{
      res = await service.checkId(id);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeFalsy();
  });
  it('checkEmail - happy case#4', async () => {
    const email: string = "bbb111@naver.com";
    let res:IsSuccessObj;
    try{
      res = await service.checkEmail(email);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeTruthy();
  });
  it('checkEmail - unhappy case#4', async () => {
    const email: string = "aaa111@naver.com";
    let res:IsSuccessObj;
    try{
      res = await service.checkEmail(email);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeFalsy();
  });

  it('sendMail - happy case#5', async () => {
    const email: string = "bbb111@naver.com";
    let res:IsSuccessObj;
    try{
      res = await service.sendMail(email);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeTruthy();
  });
  it('sendMail - unhappy case#5', async () => {
    const email: string = "aaa111@naver.com";
    let res:IsSuccessObj;
    try{
      res = await service.sendMail(email);
    }catch(err){
      expect(err.message).toBe('exist email');
    }
  });

  it('sendPwMail - happy case#6', async () => {
    const email: string = "aaa111@naver.com";
    const id:string = 'aaa111'
    let res:IsSuccessObj;
    try{
      res = await service.sendPwMail(email, id);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeTruthy();
  });
  it('sendPwMail - unhappy case#6-1', async () => {
    const email: string = "bbb111@naver.com";
    const id:string = 'bbb111'
    let res:IsSuccessObj;
    try{
      res = await service.sendPwMail(email, id);
    }catch(err){
      expect(err.message).toBe('wrong email');
    }
  });
  it('sendPwMail - unhappy case#6-2', async () => {
    const email: string = "aaa111@naver.com";
    const id:string = 'bbb111'
    let res:IsSuccessObj;
    try{
      res = await service.sendPwMail(email, id);
    }catch(err){
      expect(err.message).toBe('wrong id');
    }
  });

  it('sendIdMail - happy case#7', async () => {
    const email: string = "aaa111@naver.com";
    let res:IsSuccessObj;
    try{
      res = await service.sendIdMail(email);
    }catch(err){
      console.log(err);
    }
    expect(res.isSuccess).toBeTruthy();
  });
  it('sendIdMail - unhappy case#7', async () => {
    const email: string = "bbb111@naver.com";
    let res:IsSuccessObj;
    try{
      res = await service.sendIdMail(email);
    }catch(err){
      expect(err.message).toBe('wrong email');
    }
  });

});
