import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { userProviders } from 'src/user/entities/user.providers';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { notificationProviders } from 'src/notification/entities/notification.providers';
import { NotificationService } from 'src/notification/services/notification.service';
import { NotificationModule } from 'src/notification/notification.module';
import { notificationTokenProviders } from 'src/notification/entities/notification-token.providers';

@Module({
  imports: [UserModule, NotificationModule],
  providers: [
    AuthService,
    ...userProviders,
    UserService,
    ...notificationProviders,
    NotificationService,
    ...notificationTokenProviders,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
