import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { userProviders } from './entities/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationService } from 'src/notification/services/notification.service';
import { notificationProviders } from 'src/notification/entities/notification.providers';
import { notificationTokenProviders } from 'src/notification/entities/notification-token.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService,
    ...notificationTokenProviders,
    ...notificationProviders,
    NotificationService,
  ],
})
export class UserModule {}
