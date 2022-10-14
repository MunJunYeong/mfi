import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './configs/db/config.module';
import { PostgresConfigService } from './configs/db/config.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './lib/common/http-exception.filter';
import { LoggerMiddleware } from './lib/common/middleware/logger.middleware';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { UserTokenModule } from './user-token/user-token.module';
import { MailModule } from './lib/common/mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './lib/common/jwt';

@Module({
  imports: [
    // graphQL import
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({req}) => ({user: req['user']}),
    }),
    // Config import
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : `./src/configs/env/.${process.env.NODE_ENV}.env`
    }),
    //TypeORM import
    TypeOrmModule.forRootAsync({
      imports : [PostgresConfigModule],
      useClass : PostgresConfigService,
      inject : [PostgresConfigService]
    }),
    JwtModule.registerAsync({
      imports : [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    UserTokenModule,
    MailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { 
      provide : APP_FILTER,
      useClass : HttpExceptionFilter
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes(
      //이 아래 부분에서 미들웨어를 걸어줘야하는데 미들웨어는 구현을 함
      // {
      // path : '/graphql',
      // method : RequestMethod.GET
      // }
    );
  }
  // graphql은 3000/graphql이라는 단일 주소라서 미들웨어의 사용 개념이 아닌 인터셉터를 이용 ?
}
