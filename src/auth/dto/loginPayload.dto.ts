/* eslint-disable prettier/prettier */
import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayload {
  id: string;
  typeuser: number;
  constructor(user: UserEntity) {
    this.id = user.iduser,
    this.typeuser = user.typeuser;
  }
}
