<template>
  <div class="border-b border-primary/30 sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-4 w-full">
    <div class="flex justify-between items-center px-5">
      <NuxtLink to="/feed">
        <TheLogo class="h-12" />
      </NuxtLink>
      <Button
        variant="ghost"
        size="icon"
      >
        <Menu />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
</script>
