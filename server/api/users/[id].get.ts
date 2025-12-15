import { UserService } from '~~/server/domain/services/UserService';
import { MongoUserRepository } from '~~/server/infrastructure/MongoUserRepository';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) return { status: 400, error: 'Missing user id' };
  const repo = new MongoUserRepository();
  const service = new UserService(repo);
  const user = await service.getUserById(id);
  if (!user) return { status: 404, error: 'User not found' };
  return { status: 200, user };
});
