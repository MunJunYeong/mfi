import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepo } from './user.repo';
import { JwtService } from '../lib/common/jwt';
import { MailService } from '../lib/common/mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

// @Module({})
class MailService22 {
  authMail(email){
    console.log(11111111111111);
    return 1;
  }
};

class UserRepo22 {
  saveAuth(email){
    console.log(11111111111111);
    return 1;
  }
}

describe('UserService', () => {
  let service: UserService;
  let repo: UserRepo;
  let mailService: MailService;
  let jwtService: JwtService;


  

// Identify the Module you want to mock and mock it
// jest.mock('MailService22', () => {
//   return {
//     MailService222: {
//       forRootAsync: jest.fn().mockImplementation(() => MailService),
//     }
//   };
// });
  // jest.mock('MailService', () => {
  //   return class MailService {
  //     abc: () => {}
  //   }
  // });
  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      imports : [
      ],
      providers: [UserService, {
        provide: UserRepo,
        useClass: UserRepo22,
      }, {
        provide: MailService,
        useClass: MailService22,
      }, JwtService],
    }).compile();

    service = await module.resolve(UserService);
    // repo = await module.resolve(UserRepo);
    // mailService = module.get<MailService>(MailService);

    

  });

  it('happy case#1 - input user', async () => {
    console.log(TestingModule);
    const result = await service.saveMailAuth('tnfbxkst@aaaa.com');
    expect(result).toBeDefined();
    expect(result).toBeGreaterThan(0);
    expect(result).toBeFalsy();
  });

  // it('happy case#1 - input admin', () => {
  //   expect(service).toBeDefined();
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
