import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { notificationProviders } from './entities/notification.providers';
import { notificationTokenProviders } from './entities/notification-token.providers';

@Module({
  providers: [
    ...notificationProviders,
    ...notificationTokenProviders,
    NotificationService,
  ],
})
export class NotificationModule {}
