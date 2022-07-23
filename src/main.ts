import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { join, dirname } from 'path';
import { readFile } from 'fs/promises';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const source = await readFile(join(dirname(__dirname), 'doc', 'api.yaml'), 'utf-8');
  const document = parse(source);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
