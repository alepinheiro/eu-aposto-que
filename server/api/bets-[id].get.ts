import { BetService } from '~~/server/domain/services/BetService';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';
import { NotFoundError } from '~~/server/shared/errors';
import { betIdParamSchema } from '~~/server/shared/validators';

const betService = new BetService(new MongoBetRepository());

export default defineEventHandler(async (event) => {
  try {
    const { id } = betIdParamSchema.parse({ id: getRouterParam(event, 'id') });
    const bet = await betService.getBet(id);
    if (!bet) throw new NotFoundError('Bet not found');
    return { bet };
  }
  catch (err: any) {
    if (err instanceof NotFoundError) {
      return { error: err.message };
    }
    if (err.name === 'ZodError') {
      return { error: 'Invalid id', details: err.errors };
    }
    return { error: 'Internal server error' };
  }
});
