import { hashQuery } from './key-hasher';
describe('hashQuery', () => {
  it.each`
    query                                                                      | expectedHash
    ${'New York'}                                                              | ${'3bXca88Gq2mUpPIJCVaPyU0bqaI='}
    ${{ amenity: 'restaurant', city: 'Paris' }}                                | ${'TC8JqiNpVlcKr+g3QTJBUNFr/ng='}
    ${{ street: '123 Main St', city: 'Seattle', state: 'WA', country: 'USA' }} | ${'q1NgapIg5LxQa91/7cvooSKe8Sc='}
    ${'London'}                                                                | ${'mt3ncdPCNgmEDaBLbCuHC30Cqf8='}
    ${{ amenity: 'cafe', city: 'Berlin', country: 'Germany' }}                 | ${'iNvqLOOkDM+piEs2XqRayHh7VJo='}
  `('hashes the query correctly', ({ query, expectedHash }) => {
    const result = hashQuery(query);
    expect(result).toEqual(expectedHash);
  });
});
