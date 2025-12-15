<template>
  <div class="flex items-center gap-5 min-h-screen justify-center ">
    <div class="m-auto max-w-5xl flex gap-2 w-full">
      <form
        class="flex gap-5 w-full "
        @submit="onSubmit"
      >
        <Card class="w-full">
          <CardContent class="gap-2 flex flex-col">
            <VeeField
              v-slot="{ componentField }"
              name="statement"
            >
              <Label>
                Seu palpite
              </Label>
              <Input
                class="w-full"
                v-bind="componentField"
              />
            </VeeField>

            <VeeField
              v-slot="{ componentField }"
              name="description"
            >
              <Label>
                Descrição do palpite (opcional)
              </Label>
              <Textarea
                class="w-full"
                v-bind="componentField"
              />
            </VeeField>

            <VeeField
              v-slot="{ componentField }"
              name="category"
            >
              <Label>
                Categoria (opcional)
              </Label>
              <Input
                class="w-full"
                v-bind="componentField"
              />
            </VeeField>

            <VeeField
              v-slot="{ componentField }"
              name="description"
            >
              <Label>
                Descrição do palpite (opcional)
              </Label>
              <Textarea
                class="w-full"
                v-bind="componentField"
              />
            </VeeField>

            <VeeField
              v-slot="{ componentField }"
              name="visibility"
            >
              <Label>
                Visibilidade
              </Label>
              <FormBetVisibility
                v-bind="componentField"
                class="w-full"
              />
            </VeeField>

            <VeeField
              v-slot="{ componentField }"
              name="deadlineDate"
            >
              <Label>
                Data limite para palpites (opcional)
              </Label>
              <FormBetDeadlineDate
                v-bind="componentField"
                class="w-full"
              />
            </VeeField>

            <VeeField
              v-slot="{ componentField }"
              name="deadlineHour"
            >
              <Label>
                Hora limite para palpites (opcional)
              </Label>
              <FormBetDeadlineHour
                v-bind="componentField"
                class="w-full"
              />
            </VeeField>
          </CardContent>'

          <CardFooter class="flex justify-between">
            <Button
              variant="outline"
              type="button"
              @click="navigateTo('')"
            >
              Voltar
            </Button>
            <Button type="submit">
              Criar palpite
            </Button>
          </CardFooter>
        </Card>
      </form>

      <PreviewCard class="w-full">
        <template #header>
          <TheLogo class="h-24" />
        </template>

        {{ betStore.title || 'O Brasil vai ganhar a copa de 2026' }}

        <template #footer>
          Toque para participar!
        </template>
      </PreviewCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useBetStore } from '~/stores/bet.store';

const betStore = useBetStore();

const { handleSubmit } = useForm({
  validationSchema: z.object({
    statement: z.string().min(5, 'O título deve ter no mínimo 5 caracteres'),
    description: z.string().min(3, 'A descrição deve ter no mínimo 5 caracteres').optional(),
    category: z.string().min(3, 'A categoria deve ter no mínimo 5 caracteres').optional(),
    visibility: z.enum(['private', 'group', 'public']),
    deadlineDate: z.coerce.date().optional(),
    deadlineHour: z.coerce.date().optional(),
  }),
  initialValues: {
    statement: betStore.title,
  },
});

const onSubmit = handleSubmit(
  async (values) => {
    console.value(values);
  },
  error =>
    console.error(error),
);
</script>
