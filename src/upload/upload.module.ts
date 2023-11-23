import { Module } from '@nestjs/common';
// import { UploadService } from './upload.service';
// import { UploadController } from './upload.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './../prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { ChatModule } from 'src/chat/chat.module';
// import { ChatService } from 'src/chat/chat.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule],
  // controllers: [UploadController],
  // providers: [UploadService, JwtStrategy, UserService, ChatService, AuthService],
  providers: [JwtStrategy, UserService, AuthService],
})
export class UploadModule {}
