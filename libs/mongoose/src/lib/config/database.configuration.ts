import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri:
    process.env['DB_URI'] ||
    'mongodb://root@example:localhost:27017/boplats?authSource=admin',
}));
