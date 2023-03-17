import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePasswords, hashPassword } from 'src/utils/password';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findByUserame(login);
    if (user && (await comparePasswords(password, user.hashedPassword))) {
      return {
        id: user.id,
        login: user.username,
      };
    }
    return null;
  }

  async register(userInput: { username: string; password: string }) {
    const existingUser = await this.userService.findByUserame(
      userInput.username,
    );
    if (existingUser) throw new BadRequestException('User already exists');
    const user = new User();
    user.username = userInput.username;
    user.hashedPassword = await hashPassword(userInput.password);
    const createdUser = await this.userService.create(user);
    return this.login(createdUser);
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
