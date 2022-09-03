import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { BoardService } from '../board/board.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';

@Module({
  controllers: [UserController],
  providers: [UserService, BoardService, UserRepo]
})
export class UserModule {}
