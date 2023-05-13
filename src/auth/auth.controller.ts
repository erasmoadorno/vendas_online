import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLogin } from './dto/returnlogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
    return await this.authService.login(loginDto);
  }
}
