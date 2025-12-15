import type { GroupEntity } from './GroupEntity';

export interface GroupRepository {
  create(group: Omit<GroupEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GroupEntity>;
  findById(id: string): Promise<GroupEntity | null>;
  listByUser(userId: string): Promise<GroupEntity[]>;
  addMember(groupId: string, userId: string): Promise<GroupEntity | null>;
  removeMember(groupId: string, userId: string): Promise<GroupEntity | null>;
}
