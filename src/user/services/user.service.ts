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

  async update(user_id: number, update_dto: any) {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated_user = {
      ...user,
      username: update_dto.username,
      email: update_dto.email,
    };
    const saved_user = await this.userRepository.save(updated_user);

    return saved_user;
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
