import { NestFactory } from '@nestjs/core';
import { AppModule, environment } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FakeDatabaseDataLoader } from './database/fakeDatabaseDataLoader';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.setGlobalPrefix('api');
  app.enableCors({ origin: configService.get<string>('CORS_ORIGIN') });

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(port);
  Logger.log(`Server started on port : ${port}`);
}

bootstrap().catch((err) => Logger.error('Application failed to start', err));
