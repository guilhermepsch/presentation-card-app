/* eslint-disable */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = 400;

    const formattedErrors = exception.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    throw new BadRequestException({
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
}
