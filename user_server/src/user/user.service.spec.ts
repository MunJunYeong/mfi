import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepo } from './user.repo';
import { JwtService } from '../lib/common/jwt';
import { MailService } from '../lib/common/mail/mail.service';

describe('UserService', () => {
  let service: UserService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepo, JwtService, MailService],
    }).compile();

    service = module.get<UserService>(UserService);
    const mailSer = jest.spyOn(MailService, 'auth' );
  });

  it('happy case#1 - input user', () => {
    console.log(TestingModule);
    expect(TestingModule).toBeDefined();
  });

  // it('happy case#1 - input admin', () => {
  //   expect(service).toBeDefined();
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
