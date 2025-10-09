import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL],
    credentials: true,
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'http://cdn.jsdelivr.net', "'unsafe-inline'"],
          styleSrc: [
            "'self'",
            'cdn.jsdelivr.net',
            "'unsafe-inline'",
            'https://fonts.googleapis.com',
          ],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'cdn.jsdelivr.net'],
        },
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(
    session({
      secret: process.env.JWT_SECRET || 'default',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(
    passport.session({
      pauseStream: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
