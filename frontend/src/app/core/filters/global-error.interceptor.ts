import {ErrorHandler, inject, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ZodError} from 'zod';
import {ToastService} from '../services/toast.service';
import {GenericErrorResponse} from '@presentation/shared';

@Injectable()
export class GlobalErrorFilter implements ErrorHandler {
  private toastService = inject(ToastService);

  handleError(error: unknown): void {
    let normalized: GenericErrorResponse;

    if (error instanceof HttpErrorResponse) {
      normalized = {
        success: false,
        message: error.error?.message ?? 'Unexpected server error',
        statusCode: error.status || 500,
        errors: error.error?.errors,
      };
    } else if (error instanceof ZodError) {
      // 🔹 Format issues like: "email: Invalid email", "phone: Phone is required"
      const formattedIssues = error.errors.map(issue => {
        const path = issue.path.join('.') || 'field';
        return `${path}: ${issue.message}`;
      });

      normalized = {
        success: false,
        message: 'Validation failed',
        statusCode: 400,
        errors: formattedIssues,
      };

      // 👉 show a more useful toast
      this.toastService.error(
        'Validation error',
        formattedIssues.join('\n')
      );
      return;
    } else if (error instanceof Error) {
      normalized = {
        success: false,
        message: error.message,
        statusCode: 500,
        errors: [],
      };
    } else {
      normalized = {
        success: false,
        message: 'Unknown error',
        statusCode: 500,
        errors: error,
      };
    }

    this.toastService.error(normalized.message, normalized.errors);
  }
}
