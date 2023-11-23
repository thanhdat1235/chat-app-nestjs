import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UserService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadModule } from 'src/upload/upload.module';
// import { UploadService } from 'src/upload/upload.service';
// import { ChatController } from './chat.controller';

@Module({
  imports: [UsersModule, JwtModule, PrismaModule],
  providers: [
    ChatGateway,
    ChatService,
    UserService,
    JwtService,
    PrismaService,
    // UploadService,
  ],
  // controllers: [ChatController],
})
export class ChatModule {}
