import type { BetParticipationEntity } from '~~/server/domain/BetParticipationEntity';
import type { BetParticipationRepository } from '~~/server/domain/BetParticipationRepository';
import type { BetRepository } from '~~/server/domain/BetRepository';

export class BetParticipationService {
  constructor(
    private readonly repo: BetParticipationRepository,
    private readonly betRepository?: BetRepository,
  ) {}

  /**
   * Registra ou atualiza a participação do usuário em uma aposta.
   * Se o usuário já participou e mudou o voto, atualiza o tipo e retorna a participação atualizada.
   * Retorna a participação criada/atualizada.
   */
  async participate(input: Omit<BetParticipationEntity, 'id' | 'createdAt'>): Promise<BetParticipationEntity> {
    const existing = await this.repo.findByBetAndUser(input.betId, input.userId);

    if (!existing) {
      const created = await this.repo.create(input);
      if (this.betRepository) {
        if (input.type === 'agree') {
          await this.betRepository.agree(input.betId);
        }
        else {
          await this.betRepository.disagree(input.betId);
        }
      }
      return created;
    }
    else if (existing.type !== input.type) {
      // Mudança de voto: atualizar tipo
      const updated = await this.repo.updateType(existing.id, input.type);
      if (this.betRepository) {
        // Para mudança de voto, decrementa o anterior chamando o método oposto
        if (existing.type === 'agree') {
          await this.betRepository.disagree(input.betId);
        }
        else {
          await this.betRepository.agree(input.betId);
        }
      }
      return updated;
    }
    else {
      // Já participou com o mesmo voto, retorna existente
      return existing;
    }
  }

  async getParticipation(betId: string, userId: string): Promise<BetParticipationEntity | null> {
    return this.repo.findByBetAndUser(betId, userId);
  }

  async getParticipationCounts(betId: string): Promise<{ agree: number; disagree: number }> {
    return this.repo.countByBet(betId);
  }

  async listParticipations(betId: string): Promise<BetParticipationEntity[]> {
    return this.repo.listByBet(betId);
  }
}
