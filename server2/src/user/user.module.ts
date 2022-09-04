import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { TypeOrmExModule } from '../db/typeorm-ex.module';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([UserRepo])],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService],
})
export class UserModule {}
