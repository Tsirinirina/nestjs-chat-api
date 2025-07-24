import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TokenRequest,
  tokenRequestSchema,
} from './entities/token-request.entity';
import { TOKEN_REPOSITORY } from './token-request.constant';
import { TokenRequestController } from './token-request.controller';
import { TokenRequestMongoDbAdapter } from './token-request.mongodb.repository';
import { TokenRequestService } from './token-request.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenRequest.name, schema: tokenRequestSchema },
    ]),
  ],
  controllers: [TokenRequestController],
  providers: [
    TokenRequestService,
    { provide: TOKEN_REPOSITORY, useClass: TokenRequestMongoDbAdapter },
  ],
  exports: [TokenRequestService],
})
export class TokenRequestModule {}
