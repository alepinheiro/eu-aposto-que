import { BetFeedService } from '~~/server/domain/services/BetFeedService';

import { MongoBetCommentRepository } from '~~/server/infrastructure/MongoBetCommentRepository';
import { MongoBetParticipationRepository } from '~~/server/infrastructure/MongoBetParticipationRepository';
import { MongoBetReactionRepository } from '~~/server/infrastructure/MongoBetReactionRepository';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';

const betFeedService = new BetFeedService(
  new MongoBetRepository(),
  new MongoBetCommentRepository(),
  new MongoBetReactionRepository(),
  new MongoBetParticipationRepository(),
);

export default defineEventHandler(async (event) => {
  const limit = parseInt(getQuery(event).limit as string) || 20;
  const skip = parseInt(getQuery(event).skip as string) || 0;

  const session = await getUserSession(event);
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Usuário não autenticado',
    });
  }

  const userId = session.user.id;

  const betsWithMetrics = await betFeedService.getFeedWithMetrics(limit, skip, userId);
  return betsWithMetrics;
});
