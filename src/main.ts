import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use('/upload', express.static(join(__dirname, '../upload')));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MapoTen')
    .setDescription('MapoTen API document')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  logger.log(`실행 중인 어플리케이션 포트: ${process.env.PORT}`);
}
bootstrap();
