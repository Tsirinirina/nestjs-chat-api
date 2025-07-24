import { ConfigService } from '@nestjs/config';

export const CONFIG_TOKEN = 'CONFIG_TOKEN';

const configService = new ConfigService();

export const config = () => ({
  app: {
    host: configService.get<string>('APP_HOST', 'localhost'),
    port: configService.get<number>('APP_PORT', 3000),
  },
  dbScript: {
    superAdmin: {
      login: configService.get<string>('SUPER_ADMIN_LOGIN', 'admin'),
      password: configService.get<string>('SUPER_ADMIN_PASSWORD', 'admin'),
    },
  },
  database: {
    mongoUri: configService.get<string>(
      'MONGO_URI',
      'mongodb://localhost:27017/gateway',
    ),
  },
  jwt: {
    secretKey: configService.get<string>('JWT_SECRET_KEY', 'default_secret'),
    expiration: configService.get<string>('JWT_EXPIRATION', '1440m'),
  },
});
