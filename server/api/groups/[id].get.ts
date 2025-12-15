import { GroupService } from '~~/server/domain/services/GroupService';
import { MongoGroupRepository } from '~~/server/infrastructure/MongoGroupRepository';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) return { status: 400, error: 'Missing group id' };
  const repo = new MongoGroupRepository();
  const service = new GroupService(repo);
  const group = await service.getGroupById(id);
  if (!group) return { status: 404, error: 'Group not found' };
  return { status: 200, group };
});
