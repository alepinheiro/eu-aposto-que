import { UserService } from '~~/server/domain/services/UserService';
import { UserSchema } from '~~/server/domain/UserSchema';
import { MongoUserRepository } from '~~/server/infrastructure/MongoUserRepository';

const CreateUserInput = UserSchema.omit({ id: true, createdAt: true, updatedAt: true });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = CreateUserInput.safeParse(body);
  if (!parse.success) {
    return { status: 400, errors: parse.error.flatten() };
  }
  const repo = new MongoUserRepository();
  const service = new UserService(repo);
  const user = await service.createUser(parse.data);
  return { status: 201, user };
});
