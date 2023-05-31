import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReminderService } from '../services/reminder.service';
import {
  CreateReminderWithDateDto,
  CreateReminderWithDayWeek,
  CreateReminderWithTimeDto,
} from '../dtos/reminders.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reminders')
@ApiTags('reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post()
  @ApiBody({ type: CreateReminderWithDateDto })
  @ApiResponse({
    status: 201,
    description: 'Creates a reminder with a specific date.',
  })
  async createReminder(
    @Req() request: Request,
    @Body() createReminderDto: CreateReminderWithDateDto,
  ) {
    const user = request.user as PayloadToken;

    const reminder = await this.reminderService.createReminder(
      createReminderDto,
      user.sub,
    );
    return reminder;
  }

  @Post('daily')
  @ApiBody({ type: CreateReminderWithTimeDto })
  @ApiResponse({
    status: 201,
    description: 'Creates a daily reminder at a specific time.',
  })
  async createDailyReminder(
    @Req() request: Request,
    @Body() createReminderDto: CreateReminderWithTimeDto,
  ) {
    const user = request.user as PayloadToken;

    const reminder = await this.reminderService.createDailyReminder(
      createReminderDto,
      user.sub,
    );
    return reminder;
  }

  @Post('day-of-week')
  @ApiBody({ type: CreateReminderWithDayWeek })
  @ApiResponse({
    status: 201,
    description:
      'Creates a reminder on a specific day of the week at a specific time.',
  })
  async createDayOfWeekReminder(
    @Req() request: Request,
    @Body() createReminderDto: CreateReminderWithDayWeek,
  ) {
    const user = request.user as PayloadToken;

    const reminder = await this.reminderService.createDayOfWeekReminder(
      createReminderDto,
      user.sub,
    );
    return reminder;
  }

  @Post('business-days')
  @ApiBody({ type: CreateReminderWithTimeDto })
  @ApiResponse({
    status: 201,
    description: 'Creates a reminder on business days at a specific time.',
  })
  async createBusinessDayReminder(
    @Req() request: Request,
    @Body() createReminderDto: CreateReminderWithTimeDto,
  ) {
    const user = request.user as PayloadToken;

    const reminder = await this.reminderService.createBusinessDayReminder(
      createReminderDto,
      user.sub,
    );
    return reminder;
  }
}
