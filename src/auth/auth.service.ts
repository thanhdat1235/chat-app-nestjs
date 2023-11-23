import { UserService } from './../users/users.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
  Req,
  Request,
  Response,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

type DataResponse = {
  user: Users;
  access_tokenCookie: {
    access_token: string;
    cookie: string;
  };
  refresh_tokenCookie: {
    refresh_token: string;
    cookie: string;
  };
};

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.UserService.findOne(email);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        user.password = undefined;
        return user;
      }
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async login(user: Users): Promise<DataResponse> {
    const dataSign = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      sub: user.id,
    };
    const access_tokenCookie = this.generateAccessToken(dataSign);

    const refresh_tokenCookie = this.generateRefreshToken(dataSign);

    user.password = undefined;

    return { user, access_tokenCookie, refresh_tokenCookie };
  }

  /**
   * generateAccessToken
   */
  public generateAccessToken(payload) {
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}d`,
    });
    const cookie = `access=${access_token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}d`;
    return {
      access_token,
      cookie,
    };
  }

  /**
   * generateRefreshToken
   */
  public generateRefreshToken(payload) {
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}d`,
    });
    const cookie = `refresh=${refresh_token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}d`;
    return {
      refresh_token,
      cookie,
    };
  }
}
