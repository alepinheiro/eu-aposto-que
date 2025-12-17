import { BetService } from '~~/server/domain/services/BetService';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';

const betService = new BetService(new MongoBetRepository());

export default defineEventHandler(async (event) => {
  const limit = parseInt(getQuery(event).limit as string) || 20;
  const skip = parseInt(getQuery(event).skip as string) || 0;
  const bets = await betService.getFeed?.(limit, skip);
  return bets;
});
