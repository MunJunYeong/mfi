import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
// import {DataSource} from "typeorm";

// ormconfig.json 파일을 읽어오지를 못해서 이렇게 임시방편
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "test",
      entities: [],
      synchronize: true
    }), 
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private readonly dataSource: DataSource) {}
}
