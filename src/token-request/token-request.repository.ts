import { User } from 'src/user/entities/user.entity';
import { TokenRequest } from './entities/token-request.entity';

export interface TokenRequestRepository {
  requestTokenForPasswordReset(user: User): Promise<TokenRequest>;
  getToken(token: string): Promise<TokenRequest | null>;
  markUsedToken(token: string): Promise<boolean>;
  markTokenAsExpired(token: string): Promise<TokenRequest>;
}
