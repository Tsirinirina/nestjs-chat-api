/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data,
        meta: {
          timestamp: new Date().toISOString(),
        },
        error: null,
      })),
      catchError((err) => {
        const response = context.switchToHttp().getResponse();
        const status = err.status || 500;

        let code = 'UNKNOWN_ERROR';
        let details = 'Une erreur est survenue';
        let message = 'Une erreur est survenue';
        if (err.code) {
          code = err.code;
        }
        if (err.message) {
          message = err.message;
        }
        if (err.response) {
          if (err.response.errorDetails) {
            details = err.response.errorDetails;
          }
        }

        const errorResponse = {
          data: null,
          meta: {
            timestamp: new Date().toISOString(),
          },
          error: {
            code,
            message,
            details,
            stack: err.stack,
          },
        };

        response.status(status).json(errorResponse);

        return throwError(() => errorResponse.error.message);
      }),
    );
  }
}
