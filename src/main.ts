import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:4002'],
      credentials: true,
      preflightContinue: false,
    },
  });

  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      resave: true,
      saveUninitialized: true,
    }),
  );

  await app.listen(4001);
}
bootstrap();
