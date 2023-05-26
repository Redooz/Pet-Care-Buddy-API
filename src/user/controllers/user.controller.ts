import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { UpdateNotificationTokenDto } from 'src/notification/dtos/notification-token.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.userService.create(newUser);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Patch(':id')
  async updateUser(@Param('id') userId: number, @Body() user: UpdateUserDto) {
    return await this.userService.update(userId, user);
  }

  @ApiOperation({ summary: 'Enable push notifications for a user' })
  @ApiResponse({
    status: 200,
    description: 'Push notifications enabled successfully',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Patch(':id/push/enable')
  async enablePush(
    @Param('id') userId: number,
    @Body() notification: UpdateNotificationTokenDto,
  ) {
    return await this.userService.enablePush(userId, notification);
  }
}
