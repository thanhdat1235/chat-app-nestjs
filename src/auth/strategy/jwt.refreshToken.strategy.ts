import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, PassportModule } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['refresh'];
  return token;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
