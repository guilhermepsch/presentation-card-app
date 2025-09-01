import { z } from 'zod';

export const ResponseUserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResponseUserDto = z.infer<typeof ResponseUserSchema>;
