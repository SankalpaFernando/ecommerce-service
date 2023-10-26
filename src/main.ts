import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const { SERVER_PORT } = env;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(SERVER_PORT);
  console.log(`Server is Listening at PORT ${SERVER_PORT}`);
}
bootstrap();
