import type { BetCommentRepository } from '../BetCommentRepository';
import type { BetParticipationRepository } from '../BetParticipationRepository';
import type { BetReactionRepository } from '../BetReactionRepository';
import type { BetRepository } from '../BetRepository';
import { BetCommentService } from './BetCommentService';
import { BetFeedMetricsService } from './BetFeedMetricsService';
import { BetParticipationService } from './BetParticipationService';
import { BetReactionService } from './BetReactionService';
import { BetService } from './BetService';

export class BetFeedService {
  constructor(
    private readonly betRepository: BetRepository,
    private readonly betCommentRepository: BetCommentRepository,
    private readonly betReactionRepository: BetReactionRepository,
    private readonly betParticipationRepository: BetParticipationRepository,
  ) {}

  async getFeedWithMetrics(limit: number, skip: number, userId: string) {
    const betService = new BetService(this.betRepository);
    const betCommentService = new BetCommentService(this.betCommentRepository);
    const betReactionService = new BetReactionService(this.betReactionRepository);
    const betParticipationService = new BetParticipationService(this.betParticipationRepository);
    const metricsService = new BetFeedMetricsService(
      betCommentService,
      betReactionService,
      betParticipationService,
    );
    const bets = await betService.getFeed(limit, skip);
    const betIds = bets.map(b => b.id);
    const metrics = await metricsService.getMetricsForBets(betIds, userId);
    return bets.map(bet => ({
      ...bet,
      ...metrics[bet.id],
    }));
  }
}
