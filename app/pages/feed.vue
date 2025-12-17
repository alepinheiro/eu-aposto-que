<template>
  <div v-if="status === 'error'">
    <p>Erro ao carregar palpites</p>
  </div>
  <div v-else-if="status === 'pending'">
    <p>Carregando palpites...</p>
  </div>
  <div
    v-else
    class="flex flex-col gap-2 w-full"
  >
    <h1>Palpites dos usuários</h1>

    <NuxtLink
      v-for="bet in bets"
      :key="bet.id"
      :to="`/bet/${bet.id}`"
      as-child
    >
      <FeedBetCard :bet="bet" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Bet } from '~~/shared/BetSchema';

interface Props extends Bet {
  commentCount: number;
  reactionCount: number;
  participationCount: number;
  userParticipated: boolean;
}

const { data: bets, status } = await useFetch<Props[]>('/api/bets/feed');
</script>
