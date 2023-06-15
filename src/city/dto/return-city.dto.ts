/* eslint-disable prettier/prettier */
import { ReturnStateDto } from '../../state/dto/return-state.dto';
import { CityEntity } from '../entities/city.entity';

export class ReturnCityDto {
  name: string;
  state?: ReturnStateDto;
  constructor(cityEntity: CityEntity) {
    this.name = cityEntity.name;
    this.state = cityEntity.stateEnt
      ? new ReturnStateDto(cityEntity.stateEnt)
      : undefined;
  }
}
