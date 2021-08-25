import { NestFactory } from '@nestjs/core';
import * as express from 'express'
import { AppModule } from './app/app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
  await app.listen(3000);
}
bootstrap();
