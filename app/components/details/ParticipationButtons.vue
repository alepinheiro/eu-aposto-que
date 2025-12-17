<template>
  <div class="flex flex-col md:flex-row gap-2 w-full">
    <Button
      class="w-full border-green-200 border-2 text-green-600"
      variant="outline"
      @click="participate('agree')"
    >
      <ThumbsUp class="size-5" />
      Concordo
    </Button>
    <Button
      class="w-full border-red-200 border-2 text-red-600"
      variant="outline"
      @click="participate('disagree')"
    >
      <ThumbsDown class="size-5" />
      Discordo
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ThumbsDown, ThumbsUp } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const props = defineProps<{
  betId: string;
}>();

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
