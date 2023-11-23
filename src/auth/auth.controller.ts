import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response as ExResponse } from 'express';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  Body,
  Get,
  Response,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
('cache-manager');
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() response: ExResponse) {
    const res = await this.authService.login(req.user);

    // await this.cacheManager.set('acces_token', res.access_tokenCookie.access_token,  parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME)*1000);
    // const token = await this.cacheManager.get('acces_token');
    // console.log(token);

    response.cookie('refresh', res.refresh_tokenCookie.refresh_token, {
      httpOnly: true,
    });
    response.cookie('access', res.access_tokenCookie.access_token, {
      httpOnly: true,
    });
    req.res.setHeader('Set-Cookie', [
      res.refresh_tokenCookie.cookie,
      res.access_tokenCookie.cookie,
    ]);
    req.res.setHeader('Authorization', res.access_tokenCookie.access_token);

    await this.cacheService.set(
      'access_token',
      res.access_tokenCookie.access_token,
      parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME) * 1000,
    );

    await this.cacheService.set(
      'refresh_token',
      res.refresh_tokenCookie.refresh_token,
      parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
    );

    return response.json(res.user);
  }

  // @UseGuards(JwtRefreshAuthGuard)
  // @Post('refresh-token')
  // async getNewAccessToken(@Request() req) {
  //   const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
  //   const response = await this.authService.getNewAccessToken(refreshToken);
  //   req.res.setHeader('Authorization', response.newAccessToken.access_token);
  //   return response.user;
  // }
}
