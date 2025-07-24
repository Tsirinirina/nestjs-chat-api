import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ExternalRouteInterceptor } from '../interceptors/external-route.interceptor';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExternalRoute(handler: any) {
  return applyDecorators(
    UseInterceptors(new ExternalRouteInterceptor(handler)),
  );
}
