import { BetCommentService } from '~~/server/domain/services/BetCommentService';
import { MongoBetCommentRepository } from '~~/server/infrastructure/MongoBetCommentRepository';

export default defineEventHandler(async (event) => {
  const betId = getQuery(event).betId as string;
  if (!betId) return { status: 400, error: 'Missing betId' };
  const repo = new MongoBetCommentRepository();
  const service = new BetCommentService(repo);
  const comments = await service.listComments(betId);
  return { status: 200, comments };
});
// ...existing code from bets-comments.get.ts...
