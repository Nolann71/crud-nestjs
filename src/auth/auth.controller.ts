import {
  Controller,
  Req,
  Post,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Req() req: Request) {
    const { username, password } = req.body;
    if (!username || !password)
      throw new BadRequestException('Username or Password missing');
    const userInput = { username, password };
    return this.authService.register(userInput);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }
}
