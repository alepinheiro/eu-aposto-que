import { NotificationSchema } from '~~/server/domain/NotificationSchema';
import { NotificationService } from '~~/server/domain/services/NotificationService';
import { MongoNotificationRepository } from '~~/server/infrastructure/MongoNotificationRepository';

const NotifyInput = NotificationSchema.omit({ id: true, createdAt: true, read: true });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = NotifyInput.safeParse(body);
  if (!parse.success) {
    return { status: 400, errors: parse.error.flatten() };
  }
  const repo = new MongoNotificationRepository();
  const service = new NotificationService(repo);
  const notification = await service.notify(parse.data);
  return { status: 201, notification };
});
