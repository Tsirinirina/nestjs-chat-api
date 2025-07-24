import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from '../config/config.constant';
import { AccessTokenPayload } from '../types/user.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config().jwt.secretKey,
    });
  }

  /**
   * @param payload
   * @returns AccessTokenPayload
   * s'execute lors de l'appel de await super.canActivate(context);
   * retourne une payload contenant les infos de l'utilisateur désigné
   */
  validate(payload: AccessTokenPayload) {
    return {
      userId: payload.userId,
      username: payload.username,
    };
  }
}
