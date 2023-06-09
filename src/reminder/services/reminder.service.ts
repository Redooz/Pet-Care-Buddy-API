import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import {
  CreateReminderDto,
  CreateReminderWithDateDto,
  CreateReminderWithDayWeek,
  CreateReminderWithTimeDto,
} from '../dtos/reminders.dto';
import { NotificationService } from '../../notification/services/notification.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ReminderService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private notificationService: NotificationService,
    private userService: UserService,
  ) {}

  async createReminder(
    createReminderDto: CreateReminderWithDateDto,
    userId: number,
  ) {
    return await this.createReminderWithCronExpression(
      createReminderDto,
      userId,
      createReminderDto.date,
    );
  }

  async createDailyReminder(
    createReminderDto: CreateReminderWithTimeDto,
    userId: number,
  ) {
    // Create a cron job that runs every day at the specified time
    const cronExpression = `0 ${createReminderDto.time} * * *`; // Runs every day at the specified time
    return this.createReminderWithCronExpression(
      createReminderDto,
      userId,
      cronExpression,
    );
  }

  async createBusinessDayReminder(
    createReminderDto: CreateReminderWithTimeDto,
    userId: number,
  ) {
    // Create a cron job that runs on business days (Monday to Friday) at the specified time
    const cronExpression = `0 ${createReminderDto.time} * * 1-5`; // Runs on business days at the specified time
    return this.createReminderWithCronExpression(
      createReminderDto,
      userId,
      cronExpression,
    );
  }

  async createDayOfWeekReminder(
    createReminderDto: CreateReminderWithDayWeek,
    userId: number,
  ) {
    // Create a cron job that runs on the specified day of the week at the specified time
    const cronExpression = `0 ${createReminderDto.time} * * ${createReminderDto.dayOfWeek}`; // Runs on the specified day of the week at the specified time
    return this.createReminderWithCronExpression(
      createReminderDto,
      userId,
      cronExpression,
    );
  }

  async createReminderWithCronExpression(
    createReminderDto: CreateReminderDto,
    userId: number,
    cronExpression: string,
  ) {
    const user = await this.userService.findOne(userId);

    const { title, body } = createReminderDto;

    // Create a new cron job dynamically
    const job = new CronJob(cronExpression, () => {
      this.sendReminder(user, title, body);
    });

    // Add the cron job to the scheduler registry
    this.schedulerRegistry.addCronJob(`${title}/${userId}`, job);

    // Start the cron job
    job.start();

    // Return the created reminder
    return createReminderDto;
  }

  private async sendReminder(user: User, title: string, body?: string) {
    // Logic to send the reminder notification or perform any other action
    Logger.log(`Sending reminder`);
    await this.notificationService.sendPush(user, title, body).catch((e) => {
      console.log('Error sending push notification', e);
    });
  }
}
