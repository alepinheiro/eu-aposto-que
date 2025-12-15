<template>
  <ToggleGroup
    variant="outline"
    type="single"
  >
    <ToggleGroupItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :aria-label="option.label"
      class="flex items-center gap-2 grow"
    >
      <component
        :is="option.icon"
        class="w-4 h-4"
      />
      <span>{{ option.label }}</span>
    </ToggleGroupItem>
  </ToggleGroup>
</template>

<script setup lang="ts">
import { Globe, Lock, Users } from 'lucide-vue-next';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';

const options = [
  {
    value: 'private',
    label: 'Privado',
    icon: Lock,
  },
  {
    value: 'group',
    label: 'Grupo',
    icon: Users,
  },
  {
    value: 'public',
    label: 'Público',
    icon: Globe,
  },
];
</script>
