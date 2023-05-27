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
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    NotificationModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '30d',
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    ...userProviders,
    UserService,
    ...notificationProviders,
    NotificationService,
    ...notificationTokenProviders,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
