import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/services/user.service';
import { PayloadToken } from '../models/token.model';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(newUser: CreateUserDto) {
    const { password } = newUser;
    const plainToHash = await hash(password, 10);

    newUser = { ...newUser, password: plainToHash };

    return this.userService.create(newUser);
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await compare(password, user.password);
    if (user && isMatch) {
      const { password, ...rta } = user;
      return rta;
    }
    return null;
  }
}
