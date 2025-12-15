import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBetStore = defineStore(
  'bet',
  () => {
    const title = ref<string>('');
    return { title };
  },
  {
    persist: true,
  },
);
