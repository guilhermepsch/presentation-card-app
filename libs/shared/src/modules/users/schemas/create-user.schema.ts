import {z} from 'zod';

export const CreateUserSchema = z.object({
    email: z.email('Deve ser um email válido'),
    password: z.string().min(10, 'Deve ter pelo menos 10 caracteres').max(100, 'Deve ter no máximo 100 caracteres'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
