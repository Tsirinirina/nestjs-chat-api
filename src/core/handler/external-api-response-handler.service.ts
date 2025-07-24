/* eslint-disable complexity */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { BusinessException } from '../exceptions/business.exception';

export interface SendRequestResponse {
  status: number;
  data: any;
}

@Injectable()
export class ExternalApiResponseHandlerService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Handles sending requests to an external API and returns response or handles error.
   */
  public async sendRequest<T>(
    method: string,
    url: string,
    headers: any,
    data?: T,
    params?: Record<string, any>,
  ): Promise<SendRequestResponse> {
    try {
      const cleanHeaders = {
        ...headers,
      };
      delete cleanHeaders.host;
      delete cleanHeaders.connection;
      delete cleanHeaders['content-length'];

      const response = await firstValueFrom(
        this.httpService.request({
          method,
          url,
          headers: cleanHeaders,
          data: method !== 'GET' ? data : undefined,
          params,
        }),
      );

      return response.data.data;
    } catch (error) {
      // Log the error (optional) for troubleshooting
      let errorStatus = '';
      let errorMessage = '';

      if (error.code) {
        errorMessage = error.code;
        errorStatus = 'ECONNREFUSED';
      }

      if (error.response?.data) {
        errorMessage = error.response?.data?.message;
        errorStatus = error.status;
      }

      throw new BusinessException(
        errorStatus,
        errorMessage || 'Error sending request to external API',
        [],
      );
    }
  }
}
