import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmExModule } from 'src/lib/db/typeorm-ex.module';
import { UserRepo } from './user.repo';
import { UserTokenService } from '../user-token/user-token.service';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([UserRepo])],
  providers: [UserResolver, UserService, UserTokenService]
})
export class UserModule {}
