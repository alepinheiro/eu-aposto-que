import type { GroupEntity } from '../GroupEntity';
import type { GroupRepository } from '../GroupRepository';

export class GroupService {
  constructor(private readonly repo: GroupRepository) {}

  async createGroup(input: Omit<GroupEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GroupEntity> {
    return this.repo.create(input);
  }

  async getGroupById(id: string): Promise<GroupEntity | null> {
    return this.repo.findById(id);
  }

  async listGroupsByUser(userId: string): Promise<GroupEntity[]> {
    return this.repo.listByUser(userId);
  }

  async addMember(groupId: string, userId: string): Promise<GroupEntity | null> {
    return this.repo.addMember(groupId, userId);
  }

  async removeMember(groupId: string, userId: string): Promise<GroupEntity | null> {
    return this.repo.removeMember(groupId, userId);
  }
}
