import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAll()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.userService.findOne(id);
    return new ReturnUserDto(user);
  }

  @Get('/address/:id')
  async findWithReference(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.findUserWithRelations(id));
  }
}
