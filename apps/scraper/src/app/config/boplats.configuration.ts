import { registerAs } from '@nestjs/config';

export default registerAs('boplats', () => ({
  uri:
    process.env.BOPLATS_SEARCH_URI ||
    'https://nya.boplats.se/sok?types=1hand&area=508A8CB406FE001F00030A60',
}));
