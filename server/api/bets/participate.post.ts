import { BetParticipationService } from '~~/server/domain/services/BetParticipationService';
import { MongoBetParticipationRepository } from '~~/server/infrastructure/MongoBetParticipationRepository';
import { BetParticipationSchema } from '~~/shared/BetParticipationSchema';

const ParticipateInput = BetParticipationSchema.omit({ id: true, createdAt: true });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = ParticipateInput.safeParse(body);
  if (!parse.success) {
    return { status: 400, errors: parse.error.flatten() };
  }
  const repo = new MongoBetParticipationRepository();
  const service = new BetParticipationService(repo);
  const participation = await service.participate(parse.data);
  return { status: 201, participation };
});
