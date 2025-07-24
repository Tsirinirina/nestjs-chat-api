export interface AccessTokenPayload {
  userId: string;
  username: string;
  roles: string[];
  iat: number;
  exp: number;
}
