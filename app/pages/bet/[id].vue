<template>
  <div class="flex flex-col gap-5">
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

      <CardContent v-if="bet">
        <DetailsParticipationButtons
          v-if="loggedIn"
          :bet-id="bet.id"
          :counters="{
            agree: bet.agreeCount,
            disagree: bet.disagreeCount,
          }"
        />
        <Button
          v-else
          class="w-full"
          @click="navigateTo(`/login?redirect=${route.fullPath}`)"
        >
          Faça login para participar
        </Button>
      </CardContent>

      <CardFooter>
        <p class="text-sm text-gray-500">
          Criada em: {{ new Date(bet?.createdAt || '').toLocaleDateString() }}
        </p>
      </CardFooter>
    </Card>

    <div class="flex gap-2 w-full">
      <Button
        variant="outline"
        class="h-28 w-full flex-1"
      >
        <div class="flex flex-col gap-2 items-center">
          <Users />
          Participando
          <span>{{ bet?.participations.length ?? 0 }}</span>
        </div>
      </Button>

      <Button
        variant="outline"
        class="h-28 w-full flex-1"
      >
        <div class="flex flex-col gap-2 items-center">
          <Heart />
          Curtidas
          <span>{{ bet?.reactions.length ?? 0 }}</span>
        </div>
      </Button>

      <Button
        variant="outline"
        class="h-28 w-full flex-1"
      >
        <div class="flex flex-col gap-2 items-center">
          <MessageCircle />
          Comentários
          <span>{{ bet?.comments.length ?? 0 }}</span>
        </div>
      </Button>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Comentários</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-center text-gray-500">
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </div>
      </CardContent>
    </Card>

    <Separator />

    <div>
      <Textarea
        placeholder="Escreva seu comentário..."
        class="mb-2"
      />
      <Button class="w-full">
        Enviar Comentário
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BadgeCheckIcon, Heart, MessageCircle, Users } from 'lucide-vue-next';
import type { BetComment } from '~~/shared/BetCommentSchema';
import type { BetParticipation } from '~~/shared/BetParticipationSchema';
import type { BetReaction } from '~~/shared/BetReactionSchema';
import type { Bet } from '~~/shared/BetSchema';

const route = useRoute();
const id = route.params.id as string;
const { loggedIn, fetch } = useUserSession();

await fetch();
interface Response extends Bet {
  comments: Array<BetComment>;
  participations: Array<BetParticipation>;
  reactions: Array<BetReaction>;
}
const { data: bet } = await useFetch<Response>(() => `/api/bets/${id}`, {
  method: 'GET',
  query: {
    includeComments: true,
    includeParticipations: true,
    includeReactions: true,
  },
});

useSeoMeta({
  title: () => {
    if (bet.value) {
      return `Aposta: ${bet.value.statement}`;
    }
    return 'Detalhes da aposta';
  },
  ogTitle: () => {
    if (bet.value) {
      return `Aposta: ${bet.value.statement}`;
    }
    return 'Detalhes da aposta';
  },
  description: () => {
    if (bet.value) {
      return `"${bet.value.agreeCount} pessoas concordam e ${bet.value.disagreeCount} pessoas discordam. Qual é a sua opinião?"`;
    }
    return 'Veja os detalhes desta aposta.';
  },
  ogDescription: () => {
    if (bet.value) {
      return `"${bet.value.agreeCount} pessoas concordam e ${bet.value.disagreeCount} pessoas discordam. Qual é a sua opinião?"`;
    }
    return 'Veja os detalhes desta aposta.';
  },
  ogType: 'article',
  ogUrl: `https://eu-aposto-que.vercel.app/bet/${id}`,
});
</script>
