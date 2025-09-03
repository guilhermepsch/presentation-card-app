import { z } from 'zod';

export const JwtPayloadSchema = z.object({
  sub: z.string().uuid(),
  email: z.string().email(),
  exp: z.number(),
  iat: z.number(),
}).strict();

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
