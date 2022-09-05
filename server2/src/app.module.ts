import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './configs/db/config.module';
import { PostgresConfigService } from './configs/db/config.service';


console.log('aaaa')
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : (process.env.NODE_ENV === 'production') ? '.production.env'
      : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.local.env'
    }),
    TypeOrmModule.forRootAsync({
      imports : [PostgresConfigModule],
      useClass : PostgresConfigService,
      inject : [PostgresConfigService]
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  // constructor(private readonly dataSource: DataSource) {}
}
