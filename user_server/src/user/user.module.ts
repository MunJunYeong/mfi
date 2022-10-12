import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmExModule } from '../lib/db/typeorm-ex.module';
import { UserRepo } from './user.repo';
import { MailService } from 'src/mail/mail.service';
import { JwtModule } from '../lib/common/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports : [
    TypeOrmExModule.forCustomRepository([UserRepo]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserResolver, UserService, MailService]
})
export class UserModule {}
