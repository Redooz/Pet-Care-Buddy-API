import { DataSource } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { User } from 'src/user/entities/user.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationToken } from 'src/notification/entities/notification-token.entity';
import { Pet } from 'src/pet/entities/pet.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: (configService: ConfigType<typeof config>) => {
      const { host, name, password, port, user } = configService.mysql;

      const dataSource = new DataSource({
        type: 'mysql',
        host: host,
        port: port,
        username: user,
        password: password,
        database: name,
        entities: [User, Notification, NotificationToken, Pet],
        synchronize: true,
      });

      return dataSource.initialize();
    },
    inject: [config.KEY],
  },
];
