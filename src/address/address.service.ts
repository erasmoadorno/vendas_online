import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
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
  async create(createAddressDto: CreateAddressDto, user: string) {
    await this.cityService.findCityByid(createAddressDto.city);
    await this.userService.findOne(user);
    return this.addressRepository.save({
      ...createAddressDto,
      user,
    });
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(id: string) {
    return await this.addressRepository.findOne({ where: { idaddress: id } });
  }

  async findAddressByUserId(id: string): Promise<AddressEntity[]> {
    const addresses = await this.addressRepository.find({
      where: { user: id },
      relations: { cityEnt: { stateEnt: true } },
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('Addresses not found for this user.');
    }

    return addresses;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
