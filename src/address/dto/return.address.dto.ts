/* eslint-disable prettier/prettier */
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  number: number;
  cep: string;
  constructor(addressEntity: AddressEntity) {
    this.complement = addressEntity.complement,
    this.number = addressEntity.number,
    this.cep = addressEntity.cep;
  }
}
