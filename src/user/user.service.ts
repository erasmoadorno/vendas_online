import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TypeUser } from './enum/type-user.enum';
import { createHashedPassword, verifyHashedPassword } from '../utils/password';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new NotAcceptableException('Email already exist.');
    }

    const hashedPass = await createHashedPassword(createUserDto.password);
    return this.userRepository.save({
      ...createUserDto,
      password: hashedPass,
      typeuser: TypeUser.User,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { iduser: id } });

    if (!user) {
      throw new NotFoundException(`User id: ${id} not founded.`);
    }
    return user;
  }

  async findUserWithRelations(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { iduser: id },
      relations: {
        userAddresses: { cityEnt: { stateEnt: true } },
      },
    });
  }
  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Email ${email} not found`);
    }

    return user;
  }

  async changePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verifyPassword = await verifyHashedPassword(
      updatePasswordDto.currentPassword,
      user?.password || '',
    );

    if (!verifyPassword) {
      throw new BadRequestException('Password invalid');
    }

    const newHashedPassword = await createHashedPassword(
      updatePasswordDto.newPassword,
    );

    return this.userRepository.save({ ...user, password: newHashedPassword });
  }
}
