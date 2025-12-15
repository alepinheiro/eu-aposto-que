// ensureIndexes.ts
// Call this at app startup to ensure all MongoDB indexes are created for all collections
import { MongoBetCommentRepository } from '../infrastructure/MongoBetCommentRepository';
import { MongoBetOutcomeRepository } from '../infrastructure/MongoBetOutcomeRepository';
import { MongoBetParticipationRepository } from '../infrastructure/MongoBetParticipationRepository';
import { MongoBetReactionRepository } from '../infrastructure/MongoBetReactionRepository';
import { MongoGroupRepository } from '../infrastructure/MongoGroupRepository';
import { MongoNotificationRepository } from '../infrastructure/MongoNotificationRepository';
import { MongoUserRepository } from '../infrastructure/MongoUserRepository';

export async function ensureAllIndexes() {
  await Promise.all([
    MongoUserRepository.ensureIndexes(),
    MongoBetParticipationRepository.ensureIndexes(),
    MongoBetOutcomeRepository.ensureIndexes(),
    MongoBetReactionRepository.ensureIndexes(),
    MongoBetCommentRepository.ensureIndexes(),
    MongoGroupRepository.ensureIndexes(),
    MongoNotificationRepository.ensureIndexes(),
  ]);
}
