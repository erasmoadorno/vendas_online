/* eslint-disable prettier/prettier */
import { AddressEntity } from '../entities/address.entity';
import { cityMock } from '../../city/mocks/city.mock'

export const addressMock: AddressEntity = {
  cep: '123456789',
  complement: 'casa',
  idaddress: 'sdjasbdhusavd1253sa5d4',
  number: 1,
  user: '8f34b22e-d88d-415d-8263-cefcd6d91a93',
  city: cityMock.idCity,
};
