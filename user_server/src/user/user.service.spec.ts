import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepo } from './user.repo';
import { JwtService } from '../lib/common/jwt';
import { MailService } from '../lib/common/mail/mail.service';

describe('UserService', () => {
  let service: UserService;
  let repo: UserRepo;
  let mailService: MailService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports : [MailService],
      providers: [UserService, UserRepo, MailService, JwtService],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<UserRepo>(UserRepo);
    mailService = module.get<MailService>(MailService);

  });

  it('happy case#1 - input user', () => {
    console.log(TestingModule);
    // expect(TestingModule).toBeDefined();
  });

  // it('happy case#1 - input admin', () => {
  //   expect(service).toBeDefined();
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
