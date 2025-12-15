import { BetService } from '~~/server/domain/services/BetService';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';
import { ValidationError } from '~~/server/shared/errors';
import { createBetInputSchema } from '~~/server/shared/validators';

const betService = new BetService(new MongoBetRepository());

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const input = createBetInputSchema.parse(body);
    const bet = await betService.createBet({
      statement: input.statement,
      createdAt: new Date(),
      createdBy: input.createdBy,
    });
    return { bet };
  }
  catch (err: any) {
    if (err instanceof ValidationError || err.name === 'ZodError') {
      return { error: 'Invalid input', details: err.errors || err.message };
    }
    return { error: 'Internal server error' };
  }
});
