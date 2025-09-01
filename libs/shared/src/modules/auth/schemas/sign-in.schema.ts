import { z } from 'zod';
import { JwtPayloadSchema } from './jwt-payload.schema';

export const SignInSchema = z.object({
  email: z.email('Deve ser um email válido'),
  password: z.string().min(10, 'Deve possuir no mínimo 10 caracteres').max(100, 'Deve possuir no máximo 100 caracteres'),
});

export type SignInDto = z.infer<typeof SignInSchema>;

export const SignInResponseSchema = z.object({
  token: z.string(),
  payload: JwtPayloadSchema
});

export type SignInResponse = z.infer<typeof SignInResponseSchema>;
