import { z } from 'zod';

export const UpdateCardSchema = z.object({
    fullName: z.string().optional(),
    title: z.string().optional(),
    email: z.string().optional(),
    socialMedia: z.string().optional(),
    phoneNumber: z.string().optional(),
    description: z.string().optional(),
});

export type UpdateCardDto = z.infer<typeof UpdateCardSchema>;