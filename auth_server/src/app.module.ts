import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './configs/db/config.module';
import { PostgresConfigService } from './configs/db/config.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './lib/common/http-exception.filter';
import { LoggerMiddleware } from './lib/common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { UserTokenModule } from './user-token/user-token.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    // graphQL import
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // typePaths: ['./**/*.graphql'],
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
    UserModule,
    UserTokenModule,
    AuthenticationModule,
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
    consumer
    .apply(LoggerMiddleware)
    .forRoutes();
  }
}
