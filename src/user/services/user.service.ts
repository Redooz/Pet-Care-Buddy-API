import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateNotificationTokenDto } from 'src/notification/dtos/notification-token.dto';
import { NotificationService } from 'src/notification/services/notification.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private notificationService: NotificationService,
  ) {}

  async create(newUser: CreateUserDto) {
    return await this.userRepository.save(newUser);
  }

  async update(userId: number, updateDto: any) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = {
      ...user,
      username: updateDto.username,
      email: updateDto.email,
    };
    return await this.userRepository.save(updatedUser);
  }

  async enablePush(userId: number, updateDto: UpdateNotificationTokenDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.notificationService.acceptPushNotification(
      user,
      updateDto,
    );
  }

  async disablePush(userId: number, updateDto: UpdateNotificationTokenDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.notificationService.disablePushNotification(
      user,
      updateDto,
    );
  }
}
