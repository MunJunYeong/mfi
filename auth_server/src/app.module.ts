import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './configs/db/config.module';
import { PostgresConfigService } from './configs/db/config.service';

@Module({
  imports: [
    // graphQL import
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
