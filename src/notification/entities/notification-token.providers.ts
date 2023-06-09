import { DataSource } from 'typeorm';
import { NotificationToken } from './notification-token.entity';

export const notificationTokenProviders = [
  {
    provide: 'NOTIFICATION_TOKEN_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NotificationToken),
    inject: ['DATA_SOURCE'],
  },
];
