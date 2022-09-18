import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { TypeOrmExModule } from '../lib/db/typeorm-ex.module';

// controller와 service가 모듈에 정의되어야 컨트롤러 안에서 서비스 이용가능합니다 (DI)
@Module({
  imports : [TypeOrmExModule.forCustomRepository([UserRepo])],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService],
})
export class UserModule {}
