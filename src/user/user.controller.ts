import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../decorators/roles/roles.decorator';
import { TypeUser } from './enum/type-user.enum';
import { UserId } from '../decorators/user-id/user-id.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';

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

  @Roles(TypeUser.Admin, TypeUser.User)
  @UsePipes(ValidationPipe)
  @Patch('/password')
  async changePassword(
    @UserId() id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.changePassword(id, updatePasswordDto);
  }
}
