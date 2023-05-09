import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly cityService: CityService,
    private readonly userService: UserService,
  ) {}
  async create(user: string, createAddressDto: CreateAddressDto) {
    await this.cityService.findCityByid('' + createAddressDto.city);
    await this.userService.findOne(user);
    return await this.addressRepository.save({
      ...createAddressDto,
      user: user,
    });
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(id: string) {
    return await this.addressRepository.findOne({ where: { idaddress: id } });
  }

  async findAddressByUserId(id: string) {
    return await this.addressRepository.find({ where: { user: id } });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
