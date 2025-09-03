import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ZodExceptionFilter } from './app/common/filters/zod-exception.filter';
import { ResponseMiddleware } from './app/common/middlewares/response.middleware';
import { GlobalHttpExceptionFilter } from './app/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const responseMiddleware = new ResponseMiddleware();
  app.use(responseMiddleware.use.bind(responseMiddleware));
  app.useGlobalFilters(
    new ZodExceptionFilter(),
    new GlobalHttpExceptionFilter(),
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
