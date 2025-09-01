/* eslint-disable */
import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  GenericResponseSchema,
  PaginatedMetaSchema,
  PaginatedResponseSchema,
} from '@presentation/shared';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json.bind(res);

    res.json = (body: unknown) => {
      if (body && typeof body === 'object' && 'success' in (body as any)) {
        return originalJson(body);
      }

      let response: any;

      if (body && typeof body === 'object' && 'data' in (body as any)) {
        const { data, message, meta } = body as any;

        response = { success: true, data, message };
        if (meta) {
          response.meta = meta;
        }
      } else {
        response = { success: true, data: body };
      }

      try {
        if (Array.isArray(response.data) && response.meta) {
          response.meta = PaginatedMetaSchema.parse({
            total: Number(response.meta.total),
            page: Number(response.meta.page),
            pageSize: Number(response.meta.pageSize),
          });

          response = PaginatedResponseSchema(z.any()).parse(response);
        } else {
          response = GenericResponseSchema(z.any()).parse(response);
        }
      } catch (e) {
        console.error('Response validation failed', e);
        throw new InternalServerErrorException('Invalid response format');
      }

      return originalJson(response);
    };

    next();
  }
}
