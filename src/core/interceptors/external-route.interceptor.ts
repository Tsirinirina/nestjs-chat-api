/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';

@Injectable()
export class ExternalRouteInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExternalRouteInterceptor.name);

  constructor(private readonly handler: any) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();

    try {
      const { method, path, body } = req;
      const id = path.split('/')[2];

      if (!this.handler || !this.handler.handleRequest) {
        throw new Error('Handler does not implement handleRequest()');
      }

      this.logger.log(`Redirecting ${method} ${path} to ${this.handler.name}`);

      const result = await this.handler.handleRequest(method, id, body);

      return of(result);
    } catch (error) {
      this.logger.error(`[ERROR] ${req.method} ${req.url} - ${error.message}`);
      throw new BadRequestException(error.message || 'Request Handling Failed');
    }
  }
}
