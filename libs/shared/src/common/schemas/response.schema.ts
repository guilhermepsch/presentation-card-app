import { z } from 'zod';

export const PaginatedMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
});

export const GenericResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string().optional(),
    data: dataSchema,
  });

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string().optional(),
    data: z.array(itemSchema),
    meta: PaginatedMetaSchema,
  });

export const GenericErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  statusCode: z.number(),
  errors: z.any(),
})

export type GenericErrorResponse = z.infer<typeof GenericErrorResponseSchema>;

export type PaginatedMeta = z.infer<typeof PaginatedMetaSchema>;

export type GenericResponseOf<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof GenericResponseSchema<T>>
>;

export type PaginatedResponseOf<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof PaginatedResponseSchema<T>>
>;
