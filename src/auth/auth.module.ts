import { PrismaModule } from './../prisma/prisma.module';
import { UserService } from './../users/users.service';
import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategy/jwt.refreshToken.strategy';
// import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [UsersModule, PassportModule, PrismaModule, JwtModule],
  controllers: [AuthController],
  // providers: [AuthService, UserService, LocalStrategy, JwtRefreshStrategy, UploadService],
  providers: [AuthService, UserService, LocalStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
