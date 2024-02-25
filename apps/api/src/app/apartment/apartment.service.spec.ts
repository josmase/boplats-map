import { ApartmentService } from './apartment.service';
import { ApartmentRepository } from '@boplats-map/apartment';
import { createQueryFromRequest } from './apartment-query.helper';

jest.mock('./apartment-query.helper');

describe('ApartmentService', () => {
  let apartmentService: ApartmentService;
  let apartmentRepository: ApartmentRepository;

  beforeEach(() => {
    apartmentRepository = {} as any;
    apartmentService = new ApartmentService(apartmentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createQueryFromRequest and searchApartments with correct arguments', async () => {
    const request = {};
    const query = {};
    const apartments = [];

    (createQueryFromRequest as jest.Mock).mockReturnValue(query);

    apartmentRepository.searchApartments = jest
      .fn()
      .mockResolvedValue(apartments);
    const result = await apartmentService.getApartments(request);

    expect(createQueryFromRequest).toHaveBeenCalledWith(request);

    expect(apartmentRepository.searchApartments).toHaveBeenCalledWith(query);
    expect(result).toEqual(apartments);
  });

  it('should throw an error if searchApartments throws an error', async () => {
    const request = {};
    const error = new Error('Search error');

    (createQueryFromRequest as jest.Mock).mockReturnValue({});
    apartmentRepository.searchApartments = jest.fn().mockRejectedValue(error);

    await expect(apartmentService.getApartments(request)).rejects.toThrow(
      `Error fetching apartments: ${error.message}`
    );

    expect(createQueryFromRequest).toHaveBeenCalled();
    expect(apartmentRepository.searchApartments).toHaveBeenCalled();
  });
});
