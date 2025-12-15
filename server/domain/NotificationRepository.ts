import type { NotificationEntity } from './NotificationEntity';

export interface NotificationRepository {
  create(notification: Omit<NotificationEntity, 'id' | 'createdAt' | 'read'>): Promise<NotificationEntity>;
  listByUser(userId: string): Promise<NotificationEntity[]>;
  markAsRead(id: string): Promise<NotificationEntity | null>;
}
