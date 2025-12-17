import { createError, defineEventHandler, readBody } from 'h3';
import { BetParticipationService } from '~~/server/domain/services/BetParticipationService';
import { MongoBetParticipationRepository } from '~~/server/infrastructure/MongoBetParticipationRepository';
import { MongoBetRepository } from '~~/server/infrastructure/MongoBetRepository';
import { BetParticipationSchema } from '~~/shared/BetParticipationSchema';

const ParticipateInput = BetParticipationSchema.omit({
  id: true,
  createdAt: true,
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const session = await getUserSession(event);
    const parse = ParticipateInput.safeParse({
      ...body,
      userId: session.user?.id,
    });

    if (!parse.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Dados inválidos',
        data: parse.error,
      });
    }
    const repo = new MongoBetParticipationRepository();
    const betRepo = new MongoBetRepository();
    const service = new BetParticipationService(repo, betRepo);
    const participation = await service.participate(parse.data);
    return participation;
  }
  catch (error) {
    console.error('Error in participate endpoint:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
      data: error,
    });
  }
});
