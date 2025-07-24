import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config.constant';
import * as morgan from 'morgan';
import { logger } from './utils/logger';
import { getValidationPipe } from './config/validation-pipe.configuration';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.use(morgan('combined'));
  app.use(logger);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(getValidationPipe());
  await app.listen(config().app.port, config().app.host);
}
bootstrap();
