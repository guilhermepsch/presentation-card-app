import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GenericErrorResponse } from '@presentation/shared';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message = '';
    let errors: Record<string, any> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const errorResponse = res as {
          message?: string;
          errors?: Record<string, any>;
        };
        message = errorResponse.message || exception.message;
        errors = errorResponse.errors;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const formattedResponse: GenericErrorResponse = {
      errors: undefined,
      success: false,
      message,
      statusCode: status,
      ...(errors ? { errors } : {}),
    };

    response.status(status).json(formattedResponse);
  }
}
