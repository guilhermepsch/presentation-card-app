import { z } from 'zod';

export const IdParamUuidSchema = z.object({
  id: z.uuid(),
});

export type IdParamUuidDto = z.infer<typeof IdParamUuidSchema>;
