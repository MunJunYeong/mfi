import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([UserRepo])],
  controllers: [UserController],
  providers: [UserService, UserRepo],
  exports : [UserService],
})
export class UserModule {}
