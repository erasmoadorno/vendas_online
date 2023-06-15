/* eslint-disable prettier/prettier */
import { UserEntity } from '../entities/user.entity';
import { TypeUser } from '../enum/type-user.enum';

export const userMock: UserEntity = {
  email: 'ciclano@mail.com',
  iduser: 'dasd',
  cpf: '123456789-0',
  name: 'Ciclano',
  password: '$2b$12$IwSEUBF2glb379OICU5K9.nM1sBl86..ZgOtPQ6iwbf7MfaMt7uOO',
  phone: '40028922',
  typeuser: TypeUser.User,
};
