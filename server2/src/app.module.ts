import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './configs/db/config.module';
import { PostgresConfigService } from './configs/db/config.service';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './lib/common/middleware/logger.middleware';
import { ProductController } from './product/product.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './lib/common/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : `./src/configs/env/.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRootAsync({
      imports : [PostgresConfigModule],
      useClass : PostgresConfigService,
      inject : [PostgresConfigService]
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { // custom exception filter가 module에 적용
      provide : APP_FILTER,
      useClass : HttpExceptionFilter
    }
  ],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(ProductController);
  }
}
