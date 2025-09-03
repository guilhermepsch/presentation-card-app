import { z } from 'zod';
import { PaginationQuerySchema } from '../../../common';

export const ReadUsersSchema = PaginationQuerySchema.extend({
  email: z.string().email().optional(),
});

export type ReadUsersDto = z.infer<typeof ReadUsersSchema>;
