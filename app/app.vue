<template>
  <div>
    <Toaster />
    <main>
      <TopBar />
      <NuxtLayout>
        <NuxtPage class="p-5" />
      </NuxtLayout>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css'; // vue-sonner v2 requires this import

useSeoMeta({
  title: 'Eu aposto que...',
  description: 'Desafie seus amigos com perguntas divertidas e veja quem acerta mais!',
  ogTitle: 'Eu aposto que...',
  ogDescription: 'Desafie seus amigos com perguntas divertidas e veja quem acerta mais!',
  ogImage: 'https://eu-aposto-que.vercel.app/og-image.webp',
  twitterCard: 'summary_large_image',
  ogLocale: 'pt_BR',
});
</script>
