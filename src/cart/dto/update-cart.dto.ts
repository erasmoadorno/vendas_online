import { PartialType } from '@nestjs/mapped-types';
import { InsertCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(InsertCartDto) {}
