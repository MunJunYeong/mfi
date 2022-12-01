import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepo } from './user.repo';
import { JwtService } from '../lib/common/jwt';
import { MailService } from '../lib/common/mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';

class MailServiceMock {
  authMail(email){
    return 1;
  }

};

class UserRepoMock {
  findUserById(id: string){
    return false;
  }
  findUserByNickName(nickName: string){
    return false;
  }
  findUserByEmail(email: string){
    return false;
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

  it('happy case#1 - signUp', async () => {
    const id: string = "dfadsfasfs13123";
    const pw: string = "aaa111";
    const email: string = "aaa111";
    const nickName: string = "aaa111";
    let res: User;
    try{
      res = await service.signUp(id, pw, email, nickName);
    }catch(err){
      console.log(err);
    }
  });
  // it('happy case#1 - signUp', async () => {
  //   const result = await service.saveMailAuth('tnfbxkst@aaaa.com');
  //   expect(result).toBeDefined();
  //   expect(result).toBeGreaterThan(0);
  //   expect(result).toBeFalsy();
  // });

  // it('happy case#1 - input admin', () => {
  //   expect(service).toBeDefined();
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
