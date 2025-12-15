<template>
  <TimeFieldRoot
    v-slot="{ segments }"
    class="w-36 flex select-none bg-white items-center rounded-lg shadow-sm text-center text-green10 border p-1 data-[invalid]:border-red-500"
  >
    <template
      v-for="item in segments"
      :key="item.part"
    >
      <TimeFieldInput
        v-if="item.part === 'literal'"
        :part="item.part"
      >
        {{ item.value }}
      </TimeFieldInput>
      <TimeFieldInput
        v-else
        :part="item.part"
        class="rounded p-0.5 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
      >
        {{ item.value }}
      </TimeFieldInput>
    </template>
  </TimeFieldRoot>
</template>

<script setup lang="ts">
import { TimeFieldInput, TimeFieldRoot } from 'reka-ui';
</script>
