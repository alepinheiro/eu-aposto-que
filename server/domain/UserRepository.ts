import type { UserEntity } from './UserEntity';

export interface UserRepository {
  create(user: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  update(id: string, data: Partial<Omit<UserEntity, 'id' | 'createdAt'>>): Promise<UserEntity | null>;
}
