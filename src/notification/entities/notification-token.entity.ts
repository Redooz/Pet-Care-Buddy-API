import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'notification_tokens' })
export class NotificationToken {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the notification token',
  })
  id: number;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  @ApiProperty({
    type: () => User,
    description: 'The user associated with the notification token',
  })
  user: User;

  @Column()
  @ApiProperty({
    example: 'sc7w8eeeekj',
    description: 'The type of the device',
  })
  device_type: string;

  @Column()
  @ApiProperty({
    example: 'sdjkdskj8wooesc',
    description: 'The notification token',
  })
  notification_token: string;

  @Column({
    default: 'ACTIVE',
  })
  @ApiProperty({
    example: 'ACTIVE',
    description: 'The status of the notification token',
  })
  status: string;
}
