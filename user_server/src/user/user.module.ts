import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmExModule } from '../lib/db/typeorm-ex.module';
import { UserRepo } from './user.repo';
import { MailService } from 'src/lib/common/mail/mail.service';

@Module({
  imports : [
    TypeOrmExModule.forCustomRepository([UserRepo]),
    //jwt module는 global로 설정을 해두어서 app.module에 해둠
  ],
  providers: [UserResolver, UserService, MailService]
})
export class UserModule {}
