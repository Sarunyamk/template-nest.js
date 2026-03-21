import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? [
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(new GlobalValidationPipe());

  const port = process.env.API_PORT ?? 4000;
  const logger = new Logger('Bootstrap');
  await app.listen(port);
  logger.log(`Running on http://localhost:${port}/api`);
  logger.log(`Swagger at http://localhost:${port}/api-docs`);
}
void bootstrap();
