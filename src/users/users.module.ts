import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
// import { UploadService } from 'src/upload/upload.service';
import { UploadModule } from 'src/upload/upload.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule, UploadModule],
  controllers: [UsersController],
  // providers: [UserService, JwtStrategy, UploadService, AuthService],
  providers: [UserService, JwtStrategy, AuthService],
})
export class UsersModule {}
