/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
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
        let details: string | string[] = 'Une erreur est survenue';
        let message = 'Une erreur est survenue';

        if (err.code) {
          code = err.code;
        }
        if (err.message) {
          message = err.message;
        }

        // Détails personnalisés
        if (err.response?.errorDetails) {
          if (
            typeof err.response.errorDetails === 'string' &&
            err.response.errorDetails.includes('\n')
          ) {
            details = err.response.errorDetails
              .split('\n')
              .map((line) => line.trim())
              .filter((line) => line.startsWith('-'))
              .map((line) => line.replace(/^-\s*/, ''));
          }
        } else if (
          typeof err.message === 'string' &&
          err.message.includes('\n')
        ) {
          // Si le message contient plusieurs lignes d'erreurs
          details = err.message
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.startsWith('-'))
            .map((line) => line.replace(/^-\s*/, ''));
        }

        // Traitement du stack
        let stack: string[] | string = err.stack || null;
        if (typeof stack === 'string' && stack.includes('\n')) {
          stack = stack.split('\n').map((s) => s.trim());
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
            stack,
          },
        };

        response.status(status).json(errorResponse);

        return throwError(
          () =>
            `\n${errorResponse.error.message}\n${errorResponse.error.details}`,
        );
      }),
    );
  }
}
