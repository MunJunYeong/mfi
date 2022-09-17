import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory{
  constructor(private configService: ConfigService){}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type : 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username:  this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: ['./dist/**/*.entity.{ts,js}'], // Entity 연결
      synchronize: true, 
    }
  }
}
// export const typeORMConfig: TypeOrmModuleOptions = {
//   type : 'postgres', //Database 설정
  // host: process.env.DB_HOST,
  // port: 5432,
  // username:  process.env.DB_USERNAME,
  // password: 'postgres',
  // database: 'temp',
  // entities: ['./dist/**/*.entity.{ts,js}'], // Entity 연결
//   //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
// };