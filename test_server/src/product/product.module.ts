import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmExModule } from '../lib/db/typeorm-ex.module';
import { ProductRepo } from './product.repo';
import { UserRepo } from '../user/user.repo';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([ProductRepo, UserRepo])],
  controllers: [ProductController],
  providers: [ProductService, ],
  // exports : [ProductService],
})
export class ProductModule {}
