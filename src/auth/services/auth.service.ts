import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(newUser: CreateUserDto) {
    const { password } = newUser;
    const plainToHash = await hash(password, 10);

    newUser = { ...newUser, password: plainToHash };

    return this.userService.create(newUser);
  }
}
