import { BetService } from '~~/server/domain/services/BetService';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';
import { NotFoundError } from '~~/server/shared/errors';
import { betIdParamSchema } from '~~/server/shared/validators';

const betService = new BetService(new MongoBetRepository());

export default defineEventHandler(async (event) => {
  try {
    const { id } = betIdParamSchema.parse({ id: getRouterParam(event, 'id') });
    const bet = await betService.disagree(id);
    if (!bet) throw new NotFoundError('Bet not found');
    return { bet };
  }
  catch (err) {
    if (err instanceof NotFoundError) {
      return { error: err.message };
    }
    if ((err as any).name === 'ZodError') {
      return { error: 'Invalid id', details: (err as any).errors };
    }
    return { error: 'Internal server error' };
  }
});
