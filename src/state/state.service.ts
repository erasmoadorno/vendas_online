import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}
  async getAllState(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }

  findById(id: number) {
    return this.stateRepository.find({ where: { idstate: id } });
  }
}
