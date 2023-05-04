import { Controller, Get, Param } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async findAll(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findById(+id);
  }
}
