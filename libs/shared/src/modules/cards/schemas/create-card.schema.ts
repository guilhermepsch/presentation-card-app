import { z } from 'zod';

export const CreateCardSchema = z.object({
    fullName: z.string(),
    title: z.string(),
    email: z.string(),
    socialMedia: z.string(),
    phoneNumber: z.string().optional(),
    description: z.string().optional(),
});

export type CreateCardDto = z.infer<typeof CreateCardSchema>;
