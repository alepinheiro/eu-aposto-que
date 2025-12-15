// feedAggregations.ts
// MongoDB aggregation pipelines for bet feed and bet details
import { ObjectId } from 'mongodb';

export function betFeedPipeline(limit = 20, skip = 0) {
  return [
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    // Optionally, lookup participations, reactions, comments, outcome
  ];
}

export function betDetailsPipeline(betId: string) {
  return [
    { $match: { _id: new ObjectId(betId) } },
    // Optionally, lookup participations, reactions, comments, outcome
  ];
}
