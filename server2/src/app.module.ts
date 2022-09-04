import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
// import {DataSource} from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  // constructor(private readonly dataSource: DataSource) {}
}
