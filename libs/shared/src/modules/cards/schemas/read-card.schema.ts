import { z } from 'zod';
import {PaginationQuerySchema} from "../../../common";

export const ReadCardSchema = PaginationQuerySchema.extend({
    fullName: z.string().optional(),
    title: z.string().optional(),
    email: z.string().optional(),
})

export type ReadCardDto = z.infer<typeof ReadCardSchema>;
