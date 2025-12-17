<template>
  <form @submit="onSubmit">
    <Card>
      <CardHeader>
        <CardTitle>
          Já tem uma conta?
        </CardTitle>
        <CardDescription>
          Faça login para continuar apostando e desafiando seus amigos!
        </CardDescription>
      </CardHeader>

      <CardContent class="flex flex-col gap-2">
        <VeeField
          v-slot="{ componentField }"
          name="username"
        >
          <Label>
            Usuário
          </Label>
          <Input
            class="w-full"
            autocomplete="username"
            v-bind="componentField"
          />
        </VeeField>

        <VeeField
          v-slot="{ componentField }"
          name="password"
        >
          <Label>
            Senha
          </Label>
          <Input
            type="password"
            autocomplete="current-password"
            class="w-full"
            v-bind="componentField"
          />
        </VeeField>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          class="w-full"
        >
          Entrar
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import { LoginSchema } from '~~/shared/UserSchema';

const props = defineProps<{
  redirect?: string;
}>();

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
});

export type RegisterResponseSuccess = {
  success: boolean;
  user: {
    username: string;
    id: string;
  };
};

const onSubmit = handleSubmit (
  async (values) => {
    const response = await $fetch<RegisterResponseSuccess>('/api/auth/login', {
      method: 'POST',
      body: values,
      onResponseError: ({ response }) => {
        toast.error(response._data?.data.message || 'Erro ao autenticar usuário');
      },
    });

    if (response.success)
      await navigateTo(props.redirect || '/share');
  },
  error =>
    console.error(error),
);
</script>
