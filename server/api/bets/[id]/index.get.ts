import { BetService } from '~~/server/domain/services/BetService';
import { MongoBetCommentRepository } from '~~/server/infrastructure/MongoBetCommentRepository';
import { MongoBetParticipationRepository } from '~~/server/infrastructure/MongoBetParticipationRepository';
import { MongoBetReactionRepository } from '~~/server/infrastructure/MongoBetReactionRepository';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';
import { betDetailsQuerySchema } from '~~/server/shared/betDetailsQuerySchema';
import { betIdParamSchema } from '~~/server/shared/validators';

const betService = new BetService(new MongoBetRepository());
const betCommentRepo = new MongoBetCommentRepository();
const betParticipationRepo = new MongoBetParticipationRepository();
const betReactionRepo = new MongoBetReactionRepository();

export default defineEventHandler(async (event) => {
  // Validate route param
  const idParam = { id: getRouterParam(event, 'id') };
  const parsedId = betIdParamSchema.safeParse(idParam);
  if (!parsedId.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid id',
      data: parsedId.error.message,
    });
  }

  // Validate query params
  const query = getQuery(event);
  const parsedQuery = betDetailsQuerySchema.safeParse(query);
  if (!parsedQuery.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid query params',
      data: parsedQuery.error.message,
    });
  }

  try {
    const { id } = parsedId.data;
    const { includeComments, includeParticipations, includeReactions } = parsedQuery.data;
    const bet = await betService.getBet(id);
    if (!bet) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bet not found',
      });
    }

    // Fetch related data as requested
    const [comments, participations, reactions] = await Promise.all([
      includeComments ? betCommentRepo.listByBet(id) : undefined,
      includeParticipations ? betParticipationRepo.listByBet(id) : undefined,
      includeReactions ? betReactionRepo.listByBet(id) : undefined,
    ]);

    return {
      ...bet,
      comments,
      participations,
      reactions,
    };
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: error,
    });
  }
});
