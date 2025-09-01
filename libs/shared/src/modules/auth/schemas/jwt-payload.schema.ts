import { z } from 'zod';

export const JwtPayloadSchema = z.object({
  sub: z.uuid(),
  email: z.email(),
  exp: z.number(),
  iat: z.number(),
}).strict();

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
