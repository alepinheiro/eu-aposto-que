<template>
  <div class="flex items-center gap-5 min-h-screen justify-center">
    <Card class="flex flex-col items-center gap-5 w-full max-w-5xl">
      <CardHeader class="h-64 w-full">
        <TheLogo />
      </CardHeader>

      <CardContent class="w-full">
        <Input
          v-model="betTitle"
          class="w-full"
          placeholder="O Brasil vai ganhar a copa de 2026"
        />
      </CardContent>

      <CardFooter class="w-full flex flex-col gap-2">
        <Button
          variant="default"
          class="w-full"
          @click="onClick"
        >
          Continuar
        </Button>

        <p class="text-sm text-muted-foreground">
          Crie suas apostas personalizadas e desafie seus amigos!
        </p>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useBetStore } from '~/stores/bet.store';

const { loggedIn } = useUserSession();

const betStore = useBetStore();
const betTitle = ref<string>('');

const onClick = async () => {
  betStore.title = betTitle.value;

  if (loggedIn.value)
    await navigateTo('/share');

  await navigateTo('/login');
};
</script>
