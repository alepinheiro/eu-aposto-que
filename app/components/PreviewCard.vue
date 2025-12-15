<template>
  <Card>
    <CardHeader>
      <CardTitle>
        Preview do Palpite
      </CardTitle>
    </CardHeader>

    <CardContent class="h-full">
      <div
        :class="['w-full h-full bg-[#0e7490] aspect-9/16 relative overflow-hidden rounded-md border drop-shadow-lg flex flex-col items-center justify-between p-6', customClass]"
      >
        <!-- Background Decor Elements -->
        <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent scale-150" />

        <!-- Header Slot: Usually "EU APOSTO QUE..." -->
        <div class="relative z-10 w-full flex justify-center pt-4">
          <div class="bg-[#f59e0b] border-4 border-[#164e63] px-6 py-2 rounded-xl transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(22,78,99,1)]">
            <div class="text-[#164e63] font-anton text-2xl tracking-wide uppercase text-center leading-none">
              <slot name="header">
                {{ header || "Eu Aposto Que..." }}
              </slot>
            </div>
          </div>
        </div>

        <!-- Main Content Slot -->
        <div class="relative z-10 flex-grow flex items-center justify-center py-8">
          <div class="text-center font-anton text-5xl md:text-6xl text-[#fef3c7] drop-shadow-[4px_4px_0px_rgba(22,78,99,1)] uppercase leading-tight transform rotate-1">
            <slot>
              {{ children }}
            </slot>
          </div>
        </div>

        <!-- Footer Slot: CTA -->
        <div class="relative z-10 w-full pb-8">
          <div class="bg-[#ef4444] text-white p-4 rounded-lg shadow-lg text-center transform rotate-1 border-b-8 border-[#b91c1c]">
            <div class="font-poppins font-bold uppercase text-sm md:text-lg tracking-wider">
              <slot name="footer">
                {{ footer || "Toque para participar!" }}
              </slot>
            </div>
          </div>
        </div>

        <!-- Decorative Stars -->
        <div class="absolute top-20 left-4 text-yellow-400 text-4xl animate-pulse">
          ★
        </div>
        <div class="absolute bottom-32 right-6 text-yellow-400 text-3xl animate-pulse delay-100">
          ★
        </div>
        <div class="absolute top-1/2 left-8 text-yellow-400 text-xl">
          ✦
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Compartilhar
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
interface Props {
  header?: string;
  children?: string;
  footer?: string;
  customClass?: string;
}

withDefaults(defineProps<Props>(), {
  header: '',
  children: '',
  footer: '',
  customClass: '',
});
</script>

<style scoped>
    .delay-100 {
    animation-delay: 100ms;
    }
</style>
