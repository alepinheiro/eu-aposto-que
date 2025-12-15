import { BetReactionService } from '~~/server/domain/services/BetReactionService';
import { MongoBetReactionRepository } from '~~/server/infrastructure/MongoBetReactionRepository';

export default defineEventHandler(async (event) => {
  const betId = getQuery(event).betId as string;
  if (!betId) return { status: 400, error: 'Missing betId' };
  const repo = new MongoBetReactionRepository();
  const service = new BetReactionService(repo);
  const reactions = await service.listReactions(betId);
  return { status: 200, reactions };
});
