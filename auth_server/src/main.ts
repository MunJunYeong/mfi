import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './lib/common/winston.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : winstonLogger
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted : true,
      transform : true,
    })
  );

  await app.listen(3000);
}
bootstrap();
