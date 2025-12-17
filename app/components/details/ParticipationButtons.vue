<template>
  <div class="flex flex-col  gap-2 w-full">
    <div class="relative w-full">
      <div
        class="absolute left-0 top-0 h-full bg-green-100 rounded-md z-0 transition-all"
        :style="{ width: agreePercent + '%', opacity: agreePercent > 0 ? 1 : 0 }"
      />
      <Button
        class="w-full border-green-200 border-2 text-green-600 relative z-10 bg-transparent"
        variant="outline"
        @click="participate('agree')"
      >
        <ThumbsUp class="size-5" />
        Concordo
        <span class="ml-2 text-xs text-green-700">{{ counters?.agree ?? 0 }} votos - {{ agreePercent }}%</span>
      </Button>
    </div>
    <div class="relative w-full">
      <div
        class="absolute left-0 top-0 h-full bg-red-100 rounded-md z-0 transition-all"
        :style="{ width: disagreePercent + '%', opacity: disagreePercent > 0 ? 1 : 0 }"
      />
      <Button
        class="w-full border-red-200 border-2 text-red-600 relative z-10 bg-transparent"
        variant="outline"
        @click="participate('disagree')"
      >
        <ThumbsDown class="size-5" />
        Discordo
        <span class="ml-2 text-xs text-red-700"> {{ counters?.disagree ?? 0 }} votos - {{ disagreePercent }}%</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ThumbsDown, ThumbsUp } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

import { computed } from 'vue';

const props = defineProps<{
  betId: string;
  counters?: {
    agree: number;
    disagree: number;
  };
}>();

const totalVotes = computed(() => (props.counters?.agree ?? 0) + (props.counters?.disagree ?? 0));
const agreePercent = computed(() => {
  const total = totalVotes.value;
  if (!total) return 0;
  return Math.round(((props.counters?.agree ?? 0) / total) * 100);
});
const disagreePercent = computed(() => {
  const total = totalVotes.value;
  if (!total) return 0;
  return Math.round(((props.counters?.disagree ?? 0) / total) * 100);
});

const participate = async (type: 'agree' | 'disagree') => {
  await $fetch(`/api/bets/participate`, {
    method: 'POST',
    body: {
      betId: props.betId,
      type,
    },
  });
  toast.success('Sua participação foi registrada com sucesso!');
};
</script>
