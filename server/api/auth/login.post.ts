import { createError, defineEventHandler, readBody } from 'h3';
import { z } from 'zod';
import { UserService } from '~~/server/domain/services/UserService';
import { MongoUserRepository } from '~~/server/infrastructure/MongoUserRepository';
import { UserSchema } from '~~/shared/UserSchema';

const loginSchema = UserSchema.pick({
  username: true,
  password: true,
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const parse = loginSchema.safeParse(body);
    if (!parse.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Dados inválidos',
        data: z.treeifyError(parse.error),
      });
    }

    const userRepository = new MongoUserRepository();
    const userService = new UserService(userRepository);
    const result = await userService.authenticate(parse.data);
    if (result.error || !result.user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Usuário ou senha inválidos',
      });
    }
    // Não retornar hash da senha
    await setUserSession(event, { user: { id: result.user.id, username: result.user.username, displayName: result.user.displayName } });
    return { success: true, user: { id: result.user.id, username: result.user.username, displayName: result.user.displayName } };
  }
  catch (err: any) {
    if (err && err.statusCode) throw err;
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno ao autenticar',
      data: { error: err?.message || err },
    });
  }
});
