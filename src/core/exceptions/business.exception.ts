/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    public code: string,
    public message: string,
    public details: any[] = [],
  ) {
    super({ code, message, details }, HttpStatus.BAD_REQUEST);
  }
}
