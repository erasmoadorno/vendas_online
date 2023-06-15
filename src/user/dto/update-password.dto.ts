/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  newPassword: string;

  @IsString()
  currentPassword: string;
}
