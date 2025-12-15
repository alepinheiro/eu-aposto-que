// UserEntity represents the core domain model for a User
export interface UserEntity {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
