import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city/city.service';
import { cityMock } from '../city/mocks/city.mock';
import { userMock } from '../user/mocks/user.mock';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { addressMock } from './mocks/adress.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return all addresses to user', async () => {
    const addresses = await service.findAddressByUserId(userMock.iduser);

    expect(addresses).toEqual([addressMock]);
  });

  it('should return not found if not address registred', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);

    expect(service.findAddressByUserId(userMock.iduser)).rejects.toThrowError();
  });
});
