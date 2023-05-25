import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationToken } from '../entities/notification-token.entity';
import { NotificationTokenDto } from '../dtos/notification-token.dto';
import * as fbAdmin from 'firebase-admin';

fbAdmin.initializeApp();

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<Notification>,
    @Inject('NOTIFICATION_TOKEN_REPOSITORY')
    private notificationTokenRepository: Repository<NotificationToken>,
  ) {}

  async acceptPushNotification(
    user: any,
    notificationTokenDto: NotificationTokenDto,
  ): Promise<NotificationToken> {
    await this.notificationTokenRepository.update(
      { user: { id: user.id } },
      {
        status: 'INACTIVE',
      },
    );
    // save to db
    const notification_token = await this.notificationTokenRepository.save({
      user: user,
      device_type: notificationTokenDto.deviceType,
      notification_token: notificationTokenDto.notificationToken,
      status: 'ACTIVE',
    });

    return notification_token;
  }

  async sendPush(user: any, title: string, body: string): Promise<void> {
    try {
      const notification = await this.notificationTokenRepository.findOne({
        where: { user: { id: user.id }, status: 'ACTIVE' },
      });
      if (notification) {
        await this.notificationRepository.save({
          notification_token: notification,
          title,
          body,
          status: 'ACTIVE',
          created_by: user.username,
        });

        await fbAdmin
          .messaging()
          .send({
            notification: { title, body },
            token: notification.notification_token,
            android: { priority: 'high' },
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    } catch (error) {
      return error;
    }
  }
}
