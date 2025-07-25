/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable complexity */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { throwError } from 'rxjs';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const timestamp = new Date().toISOString();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Une erreur est survenue';
    let code = 'UNKNOWN_ERROR';
    let details: string | string[] = [];

    if (exception instanceof JsonWebTokenError) {
      code = 'JWT_ERROR';
      message = exception.message;
      details = ['Le token JWT est invalide.'];
    } else if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      message = res?.message || exception.message;
      code = res?.error || exception.name;
      details = res?.details || [];
    } else if (exception?.message) {
      message = exception.message;
      code = exception.code || 'UNKNOWN_ERROR';
      details =
        typeof message === 'string' && message.includes('\n')
          ? message
              .split('\n')
              .map((line) => line.trim())
              .filter((l) => l)
          : [message];
    }

    const errorResponse = {
      data: null,
      meta: { timestamp },
      error: {
        code,
        message,
        details,
        stack: exception.stack?.split('\n').map((s) => s.trim()) || [],
      },
    };

    response.status(status).json(errorResponse);
    return throwError(
      () => `\n${errorResponse.error.message}\n${errorResponse.error.details}`,
    );
  }
}
