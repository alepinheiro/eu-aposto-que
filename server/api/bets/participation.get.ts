import { BetParticipationService } from '~~/server/domain/services/BetParticipationService';
import { MongoBetParticipationRepository } from '~~/server/infrastructure/MongoBetParticipationRepository';

export default defineEventHandler(async (event) => {
  const betId = getQuery(event).betId as string;
  const userId = getQuery(event).userId as string;
  if (!betId || !userId) return { status: 400, error: 'Missing betId or userId' };
  const repo = new MongoBetParticipationRepository();
  const service = new BetParticipationService(repo);
  const participation = await service.getParticipation(betId, userId);
  if (!participation) return { status: 404, error: 'Participation not found' };
  return { status: 200, participation };
});
