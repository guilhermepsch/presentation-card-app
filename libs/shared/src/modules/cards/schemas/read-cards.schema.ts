import { z } from 'zod';
import {PaginationQuerySchema} from "../../../common";

export const ReadCardsSchema = PaginationQuerySchema.extend({
    fullName: z.string().optional(),
    title: z.string().optional(),
    email: z.string().optional(),
})

export type ReadCardsDto = z.infer<typeof ReadCardsSchema>;
