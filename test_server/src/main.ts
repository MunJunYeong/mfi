import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './lib/common/winston.util';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : winstonLogger
  });
  // app.useGlobalFilters(new HttpExceptionFilter()); 게이트웨이나 하이브리드 어플리케이션에는 적용이 안됨. 그래서 각 모듈 파일에서 적용하는 것을 권장 <도큐먼트>
  await app.listen(3000);
}
bootstrap();
