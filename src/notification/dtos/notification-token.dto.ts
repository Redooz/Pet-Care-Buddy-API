import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationTokenDto {
  @ApiProperty({
    example: 'sc7w8eeeekj',
    description: 'The type of the device',
  })
  deviceType: string;

  @ApiProperty({
    example: 'sdjkdskj8wooesc',
    description: 'The notification token',
  })
  notificationToken: string;
}

export class UpdateNotificationTokenDto extends PartialType(
  NotificationTokenDto,
) {}
