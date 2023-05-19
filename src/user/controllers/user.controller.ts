import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('user.controller')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.create(newUser);
  }
}
