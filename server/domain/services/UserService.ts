import { compareSync, hashSync } from 'bcrypt';
import type { UserEntity } from '~~/server/domain/UserEntity';
import type { UserRepository } from '~~/server/domain/UserRepository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(input: Pick<UserEntity, 'username' | 'password'>): Promise<{ user?: UserEntity; error?: string }> {
    const existing = await this.userRepository.findByUsername(input.username);
    if (existing) {
      return { error: 'Usuário já existe' };
    }
    const hash = await hashSync(input.password, 10);
    const user: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'> = {
      username: input.username,
      displayName: input.username,
      password: hash,
    };
    const created = await this.userRepository.create(user);
    return { user: created };
  }

  async authenticate(input: Pick<UserEntity, 'username' | 'password'>): Promise<{ user?: UserEntity; error?: string }> {
    const user = await this.userRepository.findByUsername(input.username);
    if (!user) {
      return { error: 'Usuário ou senha inválidos' };
    }
    const valid = await compareSync(input.password, user.password);
    if (!valid) {
      return { error: 'Usuário ou senha inválidos' };
    }
    return { user };
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
