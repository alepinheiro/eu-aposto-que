import { BetOutcomeService } from '~~/server/domain/services/BetOutcomeService';
import { MongoBetOutcomeRepository } from '~~/server/infrastructure/MongoBetOutcomeRepository';

export default defineEventHandler(async (event) => {
  const betId = getQuery(event).betId as string;
  if (!betId) return { status: 400, error: 'Missing betId' };
  const repo = new MongoBetOutcomeRepository();
  const service = new BetOutcomeService(repo);
  const outcome = await service.getOutcomeByBetId(betId);
  if (!outcome) return { status: 404, error: 'Outcome not found' };
  return { status: 200, outcome };
});
// ...existing code from bets-outcome.get.ts...
