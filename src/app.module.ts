import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from 'enviroments';
import { NotificationModule } from './notification/notification.module';
import { PetModule } from './pet/pet.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    UserModule,
    NotificationModule,
    PetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
