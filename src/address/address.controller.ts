import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles/roles.decorator';
import { UserId } from '../decorators/user-id/user-id.decorator';
import { TypeUser } from '../user/enum/type-user.enum';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { ReturnAddressDto } from './dto/return.address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';

@Roles(TypeUser.User)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Roles(TypeUser.User, TypeUser.Admin)
  @UsePipes(ValidationPipe)
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() user: string,
  ): Promise<AddressEntity> {
    return this.addressService.create(createAddressDto, user);
  }

  @Get()
  @Roles(TypeUser.User, TypeUser.Admin)
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @Roles(TypeUser.User, TypeUser.Admin)
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Roles(TypeUser.User, TypeUser.Admin)
  @Get('user/addresses')
  async findAddressByUserId(
    @UserId('user') user: string,
  ): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(user)).map(
      (address) => new ReturnAddressDto(address),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
