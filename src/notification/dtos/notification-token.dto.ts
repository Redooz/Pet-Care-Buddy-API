import { PartialType, ApiProperty } from '@nestjs/swagger';

export class NotificationTokenDto {
  @ApiProperty({
    example: 'Android',
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
