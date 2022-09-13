import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './configs/db/config.module';
import { PostgresConfigService } from './configs/db/config.service';
import { ProductModule } from './product/product.module';

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
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
}
