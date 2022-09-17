import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmExModule } from '../db/typeorm-ex.module';
import { ProductRepo } from './product.repo';
import { UserService } from '../user/user.service';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([ProductRepo])],
  controllers: [ProductController],
  providers: [ProductService, ],
  // exports : [ProductService],
})
export class ProductModule {}
