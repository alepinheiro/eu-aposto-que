// GroupEntity represents a user group for bets (optional, prepared)
export interface GroupEntity {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
