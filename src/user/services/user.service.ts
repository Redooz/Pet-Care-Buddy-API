import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateNotificationTokenDto } from 'src/notification/dtos/notification-token.dto';
import { NotificationService } from 'src/notification/services/notification.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private notificationService: NotificationService,
  ) {}

  async findOne(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(userEmail: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(newUser: CreateUserDto) {
    return await this.userRepository.save(newUser);
  }

  async update(userId: number, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId);

    if (updateDto.password) {
      const hashedPassword = await hash(updateDto.password, 10);
      updateDto.password = hashedPassword;
    }

    const updatedUser = Object.assign(user, updateDto);
    const savedUser = await this.userRepository.save(updatedUser);

    return savedUser;
  }

  async enablePush(userId: number, updateDto: UpdateNotificationTokenDto) {
    const user = await this.findOne(userId);

    return await this.notificationService.acceptPushNotification(
      user,
      updateDto,
    );
  }

  async disablePush(userId: number, updateDto: UpdateNotificationTokenDto) {
    const user = await this.findOne(userId);

    return await this.notificationService.disablePushNotification(
      user,
      updateDto,
    );
  }
}
