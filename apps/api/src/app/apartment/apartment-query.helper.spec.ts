import { createQueryFromRequest } from './apartment-query.helper';

describe('createQueryFromRequest', () => {
  describe('date', () => {
    it.each`
      query                                                                     | expectedQuery
      ${null}                                                                   | ${{}}
      ${{ dateStart: new Date('2022-01-01'), dateEnd: new Date('2022-12-31') }} | ${{ updatedAt: { $gte: new Date('2022-01-01'), $lte: new Date('2022-12-31') } }}
      ${{ dateStart: new Date('2022-01-01') }}                                  | ${{ updatedAt: { $gte: new Date('2022-01-01') } }}
      ${{ dateEnd: new Date('2022-12-31') }}                                    | ${{ updatedAt: { $lte: new Date('2022-12-31') } }}
    `(
      'should create query with correct argument when date is $date',
      ({ query, expectedQuery }) => {
        const result = createQueryFromRequest(query);

        expect(result).toEqual(expectedQuery);
      }
    );
  });

  describe('rooms', () => {
    it.each`
      query                           | expectedQuery
      ${null}                         | ${{}}
      ${{ roomsMin: 1 }}              | ${{ rooms: { $gte: 1 } }}
      ${{ roomsMax: 3 }}              | ${{ rooms: { $lte: 3 } }}
      ${{ roomsMin: 1, roomsMax: 3 }} | ${{ rooms: { $gte: 1, $lte: 3 } }}
    `(
      'should create query with correct argument when rooms is $rooms',
      ({ query, expectedQuery }) => {
        const result = createQueryFromRequest(query);

        expect(result).toEqual(expectedQuery);
      }
    );
  });
  describe('rent', () => {
    it.each`
      query                               | expectedQuery
      ${null}                             | ${{}}
      ${{ rentMin: 1000 }}                | ${{ rent: { $gte: 1000 } }}
      ${{ rentMax: 2000 }}                | ${{ rent: { $lte: 2000 } }}
      ${{ rentMin: 1000, rentMax: 2000 }} | ${{ rent: { $gte: 1000, $lte: 2000 } }}
    `(
      'should create query with correct argument when rent is $rent',
      ({ query, expectedQuery }) => {
        const result = createQueryFromRequest(query);

        expect(result).toEqual(expectedQuery);
      }
    );
  });
  describe('size', () => {
    it.each`
      query                            | expectedQuery
      ${null}                          | ${{}}
      ${{ sizeMin: 50 }}               | ${{ size: { $gte: 50 } }}
      ${{ sizeMax: 100 }}              | ${{ size: { $lte: 100 } }}
      ${{ sizeMin: 50, sizeMax: 100 }} | ${{ size: { $gte: 50, $lte: 100 } }}
    `(
      'should create query with correct argument when size is $size',
      ({ query, expectedQuery }) => {
        const result = createQueryFromRequest(query);

        expect(result).toEqual(expectedQuery);
      }
    );
  });
});
