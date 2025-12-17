import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(3, { error: 'O nome de usuário deve ter pelo menos 3 caracteres' }).max(32, { error: 'O nome de usuário deve ter no máximo 32 caracteres' }),
  displayName: z.string().min(1, { error: 'O nome de exibição deve ter pelo menos 1 caractere' }).max(64, { error: 'O nome de exibição deve ter no máximo 64 caracteres' }),
  password: z.string().min(6, { error: 'A senha deve ter pelo menos 6 caracteres' }).max(128, { error: 'A senha deve ter no máximo 128 caracteres' }),
  avatarUrl: z.url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const LoginSchema = UserSchema.pick({
  username: true,
  password: true,
});

export type Login = z.infer<typeof LoginSchema>;
