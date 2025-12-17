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
      <Card>
        <CardHeader>
          <div class="flex flex-row gap-2 justify-between items-center">
            <CardTitle>
              {{ bet?.statement }}
            </CardTitle>

            <Badge
              variant="secondary"
              class="bg-blue-500 text-white dark:bg-blue-600"
            >
              <BadgeCheckIcon />
              Aberta
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Separator />
        </CardContent>

        <CardFooter class="flex gap-2 justify-between opacity-60 py-0">
          <div class="flex gap-2 text-sm">
            <div class="flex gap-2 ">
              <Users class="size-4" />
              0
            </div>
            <div class="flex gap-2 ">
              <Heart class="size-4" />
              0
            </div>
            <div class="flex gap-2 ">
              <MessageCircle class="size-4" />
              0
            </div>
          </div>

          <div>
            {{ new Date(bet?.createdAt || '').toLocaleString() }}
          </div>
        </CardFooter>
      </Card>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { BadgeCheckIcon, Heart, MessageCircle, Users } from 'lucide-vue-next';
import type { Bet } from '~~/shared/BetSchema';

const { data: bets, status } = await useFetch<Bet[]>('/api/bets/feed');
</script>
