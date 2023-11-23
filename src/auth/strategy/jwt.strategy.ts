import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, PassportModule } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['access'];
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    
    return { userId: payload.sub, email: payload.email };
  }
}
