/* eslint-disable prettier/prettier */
import { ReturnCityDto } from 'src/city/dto/return-city.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  number: number;
  cep: string;
  city?: ReturnCityDto;
  constructor(addressEntity: AddressEntity) {
    this.complement = addressEntity.complement,
    this.number = addressEntity.number,
    this.cep = addressEntity.cep;
    this.city = addressEntity.cityEnt? new ReturnCityDto(addressEntity.cityEnt) : undefined;
  }
}
