import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri:
    process.env.DB_URI || 'mongodb://localhost:27017/boplats?authSource=admin',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'example',
}));
