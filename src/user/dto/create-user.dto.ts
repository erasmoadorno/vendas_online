import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  readonly idUser: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly cpf: string;
  @IsString()
  readonly phone: string;
  @IsInt()
  readonly typeuser: number;
}
