import type { NotificationEntity } from '../NotificationEntity';
import type { NotificationRepository } from '../NotificationRepository';

export class NotificationService {
  constructor(private readonly repo: NotificationRepository) {}

  async notify(input: Omit<NotificationEntity, 'id' | 'createdAt' | 'read'>): Promise<NotificationEntity> {
    return this.repo.create(input);
  }

  async listNotifications(userId: string): Promise<NotificationEntity[]> {
    return this.repo.listByUser(userId);
  }

  async markAsRead(id: string): Promise<NotificationEntity | null> {
    return this.repo.markAsRead(id);
  }
}
