import { z } from 'zod';
import { BetOutcomeService } from '~~/server/domain/services/BetOutcomeService';
import { MongoBetOutcomeRepository } from '~~/server/infrastructure/MongoBetOutcomeRepository';

const ResolveInput = z.object({
  betId: z.string(),
  outcome: z.enum(['yes', 'no', 'cancelled']),
  resolvedBy: z.string(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = ResolveInput.safeParse(body);
  if (!parse.success) {
    return { status: 400, errors: parse.error.flatten() };
  }
  const repo = new MongoBetOutcomeRepository();
  const service = new BetOutcomeService(repo);
  const outcome = await service.resolveBet(parse.data.betId, parse.data.outcome, parse.data.resolvedBy);
  if (!outcome) return { status: 404, error: 'Bet outcome not found' };
  return { status: 200, outcome };
});
