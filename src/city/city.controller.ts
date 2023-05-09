import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  // @Post()
  // create(@Body() createCityDto: CreateCityDto) {
  //   return this.cityService.create(createCityDto);
  // }

  @Get()
  findAll(): Promise<CityEntity[]> {
    return this.cityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.getCitiesByState(+id);
  }

  @Get('citybyid/:id')
  findById(@Param('id') id: string) {
    return this.cityService.findCityByid(id);
  }
}
