import { registerAs } from '@nestjs/config';

export default registerAs('nominatim', () => ({
  userAgent: process.env.USER_AGENT || 'Boplats-Map',
  apiUrl: process.env.API_URL || 'https://nominatim.openstreetmap.org',
  timeBetweenRequestsMs: parseInt(process.env.TIME_BETWEEN_REQUESTS_MS) || 1500,
}));
