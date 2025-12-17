import { BetService } from '~~/server/domain/services/BetService';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';
import { ValidationError } from '~~/server/shared/errors';
import { createBetInputSchema } from '~~/server/shared/validators';

const betService = new BetService(new MongoBetRepository());

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const input = createBetInputSchema.parse(body);
    const session = await getUserSession(event);
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Usuário não autenticado',
      });
    }
    const bet = await betService.createBet({
      statement: input.statement,
      createdBy: session.user.id,
    });

    return bet;
  }
  catch (err) {
    if (err instanceof ValidationError || (err as any).name === 'ZodError') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid input',
        data: (err as any).errors || (err as any).message,
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
