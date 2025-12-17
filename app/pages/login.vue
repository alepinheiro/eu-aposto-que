<template>
  <div class="flex flex-col md:flex-row items-center gap-5 min-h-screen justify-center">
    <LoginAuthForm
      :redirect
      class="max-w-sm w-full"
    />
    <LoginSignUpForm
      :redirect
      class="max-w-sm w-full"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const redirect = route.query.redirect as string | undefined;
</script>
