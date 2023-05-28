import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from '../services/auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User registered successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  //
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @ApiOperation({ summary: 'Authenticate and log in a user' })
  @UseGuards(AuthGuard('local')) //Validate email and password using a guard
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: LoginAuthDto })
  @Post('login')
  //
  loginUser(@Req() req: Request) {
    return this.authService.generateJWT(req.user as User);
  }
}
