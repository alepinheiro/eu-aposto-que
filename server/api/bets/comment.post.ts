import { BetCommentService } from '~~/server/domain/services/BetCommentService';
import { MongoBetCommentRepository } from '~~/server/infrastructure/MongoBetCommentRepository';
import { BetCommentSchema } from '~~/shared/BetCommentSchema';

const CommentInput = BetCommentSchema.omit({ id: true, createdAt: true, updatedAt: true });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = CommentInput.safeParse(body);
  if (!parse.success) {
    return { status: 400, errors: parse.error.flatten() };
  }
  const repo = new MongoBetCommentRepository();
  const service = new BetCommentService(repo);
  const comment = await service.comment(parse.data);
  return { status: 201, comment };
});

// ...existing code from bets-comment.post.ts...
