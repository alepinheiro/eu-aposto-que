import type { UserEntity } from '../UserEntity';
import type { UserRepository } from '../UserRepository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    return this.userRepository.create(input);
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findByUsername(username);
  }

  async updateUser(id: string, data: Partial<Omit<UserEntity, 'id' | 'createdAt'>>): Promise<UserEntity | null> {
    return this.userRepository.update(id, data);
  }
}
