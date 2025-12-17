import type { User } from '~~/shared/UserSchema';

// UserEntity represents the core domain model for a User
export interface UserEntity extends User {
  id: string;
  username: string;
  displayName: string;
  password: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
