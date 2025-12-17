<template>
  <Card class="hover:shadow-xl active:shadow-xl transition ease-in-out">
    <CardHeader>
      <div class="flex flex-row gap-2 justify-between items-center">
        <CardTitle>
          {{ bet.statement }}
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

      <p class="text-xs">
        {{ new Date(bet.createdAt || '').toLocaleString() }}
      </p>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { BadgeCheckIcon, Heart, MessageCircle, Users } from 'lucide-vue-next';
import type { Bet } from '~~/shared/BetSchema';

defineProps<{
  bet: Bet;
}>();
</script>
