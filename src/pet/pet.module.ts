import { Module } from '@nestjs/common';
import { PetService } from './services/pet.service';
import { petProviders } from './entities/pet.providers';
import { PetController } from './controllers/pet.controller';
import { UserService } from 'src/user/services/user.service';
import { userProviders } from 'src/user/entities/user.providers';
import { NotificationService } from 'src/notification/services/notification.service';
import { notificationProviders } from 'src/notification/entities/notification.providers';
import { notificationTokenProviders } from 'src/notification/entities/notification-token.providers';

@Module({
  providers: [
    PetService,
    ...petProviders,
    UserService,
    ...userProviders,
    NotificationService,
    ...notificationProviders,
    ...notificationTokenProviders,
  ],
  controllers: [PetController],
})
export class PetModule {}
