import { BetService } from '~~/server/domain/services/BetService';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';
import { betIdParamSchema } from '~~/server/shared/validators';

const betService = new BetService(new MongoBetRepository());

export default defineEventHandler(async (event) => {
  const idParam = { id: getRouterParam(event, 'id') };
  const parsed = betIdParamSchema.safeParse(idParam);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid id',
      data: parsed.error.message,
    });
  }

  try {
    const { id } = parsed.data;
    const bet = await betService.getBet(id);
    if (!bet) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bet not found',
      });
    }
    return bet;
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: error,
    });
  }
});
