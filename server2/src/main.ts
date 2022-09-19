import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { winstonLogger } from './lib/common/winston.util';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : winstonLogger
    // logger : process.env.NODE_ENV === 'local'
    // ? ['error', 'warn', 'log', 'verbose', 'debug']
    // : ['error', 'warn', 'log']
  });
  await app.listen(3000);
}
bootstrap();
