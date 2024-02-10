import { createHash } from 'crypto';
import { StructuredQuery } from './nominatim/request';

export function hashQuery(query: string | Partial<StructuredQuery>): string {
  const normalizedQuery = JSON.stringify(query);
  return createHash('sha1').update(normalizedQuery).digest('base64');
}
