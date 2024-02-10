import { createHash } from 'crypto';
import { StructuredQuery } from './request';

interface QueryParams extends StructuredQuery {
  q: string;
  format: 'geojson';
}

export function createQueryParams(query: string | Partial<StructuredQuery>) {
  let params: Partial<QueryParams> = {
    format: 'geojson',
  };
  if (typeof query === 'string') {
    params = { ...params, q: query };
  } else {
    params = { ...params, ...query };
  }

  const queryParams = new URLSearchParams(params);
  return queryParams;
}

export function hashQuery(query: URLSearchParams): string {
  const normalizedQuery = JSON.stringify(query);
  return createHash('sha1').update(normalizedQuery).digest('base64');
}
