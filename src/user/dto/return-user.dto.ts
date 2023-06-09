/* eslint-disable prettier/prettier */
import { ReturnAddressDto } from '../../address/dto/return.address.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  iduser: string;
  name: string;
  // email: string;
  // phone: string;
  // cpf: string;
  typeuser: number;
  userAddress: ReturnAddressDto[];

  constructor(userEntity: UserEntity) {
    //No constructor tinha colocado readonly, ao testar o endpoint de get all users, retornava todos os dados inclusive senhas e alguma outra informação sensível, então sem readonly só retorna esses 5 dados
    this.iduser = userEntity.iduser;
    this.name = userEntity.name;
    this.typeuser = userEntity.typeuser
    // this.email = userEntity.email;
    // this.phone = userEntity.phone;
    // this.cpf = userEntity.cpf;
    this.userAddress = userEntity.userAddresses ? userEntity.userAddresses.map((address) => new ReturnAddressDto(address)) : undefined
  }
}
