import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationToken } from '../entities/notification-token.entity';
import { UpdateNotificationTokenDto } from '../dtos/notification-token.dto';
import * as fbAdmin from 'firebase-admin';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<Notification>,
    @Inject('NOTIFICATION_TOKEN_REPOSITORY')
    private notificationTokenRepository: Repository<NotificationToken>,
  ) {}

  async getNotifications() {
    return await this.notificationRepository.find();
  }

  async acceptPushNotification(
    user: any,
    notificationTokenDto: UpdateNotificationTokenDto,
  ): Promise<NotificationToken> {
    await this.notificationTokenRepository.update(
      {
        user: {
          id: user.id,
        },
      },
      {
        status: 'INACTIVE',
      },
    );
    // save to db
    const notificationToken = await this.notificationTokenRepository.save({
      user: user,
      device_type: notificationTokenDto.deviceType,
      notification_token: notificationTokenDto.notificationToken,
      status: 'ACTIVE',
    });

    return notificationToken;
  }

  async disablePushNotification(
    user: any,
    notificationTokenDto: UpdateNotificationTokenDto,
  ) {
    try {
      await this.notificationTokenRepository.update(
        {
          user: {
            id: user.id,
          },
          device_type: notificationTokenDto.deviceType,
        },
        {
          status: 'INACTIVE',
        },
      );
    } catch (error) {
      return error;
    }
  }

  async sendPush(user: User, title: string, body?: string): Promise<void> {
    try {
      const notification = await this.notificationTokenRepository.findOne({
        where: { user: { id: user.id }, status: 'ACTIVE' },
      });

      if (!notification) {
        throw new NotFoundException('Notification token not found');
      }

      await this.notificationRepository.save({
        notification_token: notification,
        title,
        body,
        status: 'ACTIVE',
        created_by: user.email,
      });

      await fbAdmin
        .messaging()
        .send({
          notification: { title, body },
          token: notification.notification_token,
          android: { priority: 'high' },
        })
        .catch((error) => {
          Logger.error('Error sending push notification', error);
          throw new InternalServerErrorException(
            'Error sending push notification',
          );
        });
    } catch (error) {
      return error;
    }
  }
}
