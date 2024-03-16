import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { GetApartmentRequest } from '@boplats-map/api-schema';
import { Apartment } from '@boplats-map/apartment';
import { ApartmentServiceMock } from './__mocks__/apartment.service.mock';

describe('ApartmentController', () => {
  let controller: ApartmentController;
  let apartmentService: ApartmentServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentController],
      providers: [
        {
          provide: ApartmentService,
          useClass: ApartmentServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ApartmentController>(ApartmentController);
    apartmentService = module.get<ApartmentService>(ApartmentService) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getApartments', () => {
    it('should call getApartments method of service with correct argument', async () => {
      const request: GetApartmentRequest = {};
      const expectedResult: Apartment[] = [];

      apartmentService.getApartments.mockResolvedValue(expectedResult);

      const result = await controller.getApartments(request);

      expect(result).toEqual(expectedResult);
      expect(apartmentService.getApartments).toHaveBeenCalledWith(request);
    });
  });
});
