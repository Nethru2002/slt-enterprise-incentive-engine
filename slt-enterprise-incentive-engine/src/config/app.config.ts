import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
}));