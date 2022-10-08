import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmExModule } from '../lib/db/typeorm-ex.module';
import { UserRepo } from './user.repo';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([UserRepo])],
  providers: [UserResolver, UserService]
})
export class UserModule {}
