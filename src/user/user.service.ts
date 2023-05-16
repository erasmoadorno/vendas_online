import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new NotAcceptableException('Email already exist.');
    }

    const salt = 12;
    const hashedPass = await hash(createUserDto.password, salt);
    return this.userRepository.save({
      ...createUserDto,
      password: hashedPass,
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
}
