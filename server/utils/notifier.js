import cron from 'node-cron';
import Task from '../models/Task.js';
import { sendEmail } from './email.js';

export const startNotificationCron = () => {
  // Check every hour
  cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const threshold = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours ahead
    
    const upcomingTasks = await Task.find({
      dueDate: { $lte: threshold },
      notificationSent: false
    }).populate('user');

    for (const task of upcomingTasks) {
      await sendEmail({
        to: task.user.email,
        subject: `Upcoming Deadline: ${task.title}`,
        text: `Your task "${task.title}" is due on ${task.dueDate.toLocaleDateString()}`
      });
      task.notificationSent = true;
      await task.save();
    }
  });
};