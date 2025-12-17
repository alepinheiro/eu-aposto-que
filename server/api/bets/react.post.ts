import { BetReactionService } from '~~/server/domain/services/BetReactionService';
import { MongoBetReactionRepository } from '~~/server/infrastructure/MongoBetReactionRepository';
import { BetReactionSchema } from '~~/shared/BetReactionSchema';

const ReactInput = BetReactionSchema.omit({ id: true, createdAt: true });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = ReactInput.safeParse(body);
  if (!parse.success) {
    return { status: 400, errors: parse.error.flatten() };
  }
  const repo = new MongoBetReactionRepository();
  const service = new BetReactionService(repo);
  const reaction = await service.react(parse.data);
  return { status: 201, reaction };
});
