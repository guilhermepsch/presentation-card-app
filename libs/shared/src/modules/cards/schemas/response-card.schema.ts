import { z } from 'zod';

export const ResponseCardSchema = z.object({
    id: z.string().uuid(),
    fullName: z.string(),
    title: z.string(),
    email: z.string().email(),
    socialMedia: z.string(),
    phoneNumber: z.string().optional(),
    description: z.string().optional(),
    userId: z.string().uuid(),
    createdAt: z.string().date(),
    updatedAt: z.string().date(),
});

export type ResponseCardDto = z.infer<typeof ResponseCardSchema>;
