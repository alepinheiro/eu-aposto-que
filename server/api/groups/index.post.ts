import { GroupSchema } from '~~/server/domain/GroupSchema';
import { GroupService } from '~~/server/domain/services/GroupService';
import { MongoGroupRepository } from '~~/server/infrastructure/MongoGroupRepository';

const CreateGroupInput = GroupSchema.omit({ id: true, createdAt: true, updatedAt: true, memberIds: true });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = CreateGroupInput.safeParse(body);
  if (!parse.success) {
    return { status: 400, errors: parse.error.flatten() };
  }
  const repo = new MongoGroupRepository();
  const service = new GroupService(repo);
  const group = await service.createGroup(parse.data);
  return { status: 201, group };
});
