import { Controller } from '@nestjs/common';
import { TokenRequestService } from './token-request.service';

@Controller('token-request')
export class TokenRequestController {
  constructor(private readonly tokenRequestService: TokenRequestService) {}
}
