import { defineEventHandler, readBody } from 'h3';
import { z } from 'zod';
import { UserService } from '~~/server/domain/services/UserService';
import { MongoUserRepository } from '~~/server/infrastructure/MongoUserRepository';
import { UserSchema } from '~~/shared/UserSchema';

const registerSchema = UserSchema.pick({
  username: true,
  password: true,
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const parse = registerSchema.safeParse(body);
    if (!parse.success) {
      throw createError({
        statusCode: 400,
        message: 'Dados inválidos',
        data: z.treeifyError(parse.error),
      });
    }

    const userRepository = new MongoUserRepository();
    const userService = new UserService(userRepository);

    const result = await userService.register(parse.data);
    if (result.error || !result.user) {
      throw createError({
        statusCode: 400,
        message: result.error || 'Erro ao registrar usuário',
      });
    }
    return { success: true, user: { username: result.user.username, id: result.user.id } };
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erro interno ao registrar usuário',
      data: error,
    });
  }
});
