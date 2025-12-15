import { NotificationService } from '~~/server/domain/services/NotificationService';
import { MongoNotificationRepository } from '~~/server/infrastructure/MongoNotificationRepository';

export default defineEventHandler(async (event) => {
  const userId = getQuery(event).userId as string;
  if (!userId) return { status: 400, error: 'Missing userId' };
  const repo = new MongoNotificationRepository();
  const service = new NotificationService(repo);
  const notifications = await service.listNotifications(userId);
  return { status: 200, notifications };
});
