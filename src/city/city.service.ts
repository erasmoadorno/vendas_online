import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
// import { CreateCityDto } from './dto/create-city.dto';
// import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}
  // create(createCityDto: CreateCityDto) {
  //   return 'This action adds a new city';
  // }

  async findAll(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async getCitiesByState(id: string) {
    const cities = await this.cacheService.getCache<CityEntity[]>(
      `state_${id}`,
      () => this.cityRepository.find({ where: { state: id } }),
    );

    return cities;
  }
  async findCityByid(id: string) {
    const city = await this.cityRepository.findOne({ where: { idCity: id } });
    if (!city) {
      throw new NotFoundException(`City id: ${id} not founded.`);
    }

    return city;
  }
}
