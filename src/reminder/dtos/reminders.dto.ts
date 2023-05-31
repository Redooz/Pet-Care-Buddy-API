// create-reminder.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateReminderDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  body?: string;
}

export class CreateReminderWithDateDto extends CreateReminderDto {
  @ApiProperty()
  @IsString()
  date: string;
}

export class CreateReminderWithTimeDto extends CreateReminderDto {
  @ApiProperty()
  @IsString()
  time: string;
}

export class CreateReminderWithDayWeek extends CreateReminderWithTimeDto {
  @ApiProperty()
  @IsNumberString()
  dayOfWeek: string;
}
