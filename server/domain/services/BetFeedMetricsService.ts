import type { BetCommentService } from './BetCommentService';
import type { BetParticipationService } from './BetParticipationService';
import type { BetReactionService } from './BetReactionService';

export interface FeedBetMetrics {
  betId: string;
  commentCount: number;
  reactionCount: number;
  participationCount: number;
  userParticipated: boolean;
}

export class BetFeedMetricsService {
  constructor(
    private readonly betCommentService: BetCommentService,
    private readonly betReactionService: BetReactionService,
    private readonly betParticipationService: BetParticipationService,
  ) {}

  async getMetricsForBets(betIds: string[], userId: string): Promise<Record<string, FeedBetMetrics>> {
    const metrics: Record<string, FeedBetMetrics> = {};
    // For performance, fetch all data in parallel
    const [comments, reactions, participations] = await Promise.all([
      Promise.all(betIds.map(betId => this.betCommentService.listComments(betId))),
      Promise.all(betIds.map(betId => this.betReactionService.countReactions(betId))),
      Promise.all(betIds.map(betId => this.betParticipationService.listParticipations(betId))),
    ]);
    betIds.forEach((betId, idx) => {
      const commentCount = comments[idx].length;
      const reactionCount = reactions[idx];
      const participationCount = participations[idx].length;
      const userParticipated = participations[idx].some(p => p.userId === userId);
      metrics[betId] = {
        betId,
        commentCount,
        reactionCount,
        participationCount,
        userParticipated,
      };
    });
    return metrics;
  }
}
