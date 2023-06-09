import { Module } from '@nestjs/common';
import { ReminderService } from './services/reminder.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { NotificationService } from 'src/notification/services/notification.service';
import { notificationProviders } from 'src/notification/entities/notification.providers';
import { notificationTokenProviders } from 'src/notification/entities/notification-token.providers';
import { ReminderController } from './controller/reminder.controller';
import { UserService } from 'src/user/services/user.service';
import { userProviders } from 'src/user/entities/user.providers';

@Module({
  providers: [
    UserService,
    ReminderService,
    SchedulerRegistry,
    NotificationService,
    ...userProviders,
    ...notificationProviders,
    ...notificationTokenProviders,
  ],
  controllers: [ReminderController],
})
export class ReminderModule {}
