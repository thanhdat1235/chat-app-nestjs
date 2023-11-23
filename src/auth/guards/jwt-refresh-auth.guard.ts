import { AuthService } from '../auth.service';
import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Request, Response } from 'express';
import { trace } from 'console';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  private readonly request: Request;
  private readonly response: Response;
  constructor(private readonly authService: AuthService) {
    super();
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {

    if (err || !user) {
      Logger.error(`Unauthorized: ${info && info.message}`);
      if (info.message == 'jwt expired') {
        throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
      }

      return user;
    }
  }
}
