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

      <CardContent class="flex flex-col md:flex-row gap-2 w-full">
        <Button
          class="w-full"
          variant="outline"
        >
          <ThumbsUp />
          Concordo
        </Button>
        <Button
          class="w-full"
          variant="outline"
        >
          <ThumbsDown />
          Discordo
        </Button>
      </CardContent>

      <CardFooter>
        <div>
          Criada em: {{ new Date(bet?.createdAt || '').toLocaleDateString() }}
        </div>
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
          <span>{{ bet?.agreeCount + bet?.disagreeCount }}</span>
        </div>
      </Button>

      <Button
        variant="outline"
        class="h-28 w-full flex-1"
      >
        <div class="flex flex-col gap-2 items-center">
          <Heart />
          Reações
          <span>{{ bet?.agreeCount + bet?.disagreeCount }}</span>
        </div>
      </Button>

      <Button
        variant="outline"
        class="h-28 w-full flex-1"
      >
        <div class="flex flex-col gap-2 items-center">
          <MessageCircle />
          Comentários
          <span>{{ bet?.agreeCount + bet?.disagreeCount }}</span>
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
import { BadgeCheckIcon, Heart, MessageCircle, ThumbsDown, ThumbsUp, Users } from 'lucide-vue-next';
import type { Bet } from '~~/shared/BetSchema';

const route = useRoute();
const id = route.params.id as string;

const { data: bet } = await useFetch<Bet>(() => `/api/bets/${id}`, {
  method: 'GET',
});
</script>
