/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePasswordMock } from '../mocks/update-password.mock';
import { userMock } from '../mocks/user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide: getRepositoryToken(UserEntity),
        useValue: {
            findOne: jest.fn().mockReturnValue(userMock),
            save: jest.fn().mockReturnValue(userMock),
        }
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user by id', async () => {
    const user = await service.findOne(userMock.iduser);
    expect(user).toEqual(userMock);
  });

  it('should return error in findOne function'  ,async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());
    expect(service.findOne).rejects.toThrowError();
  });

  it('Should return a new password', async () => {
    const newPass = await service.changePassword(userMock.iduser, updatePasswordMock);
    expect(newPass).toEqual(userMock)
  });

  it('should return error in change password function', async () => {
    jest.spyOn(userRepository, 'save').mockRejectedValue(new Error());

    expect(service.changePassword).rejects.toThrowError()
  })


});
