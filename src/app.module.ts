import { ChatGateway } from './chat/chat.gateway';
import { Module, CacheModule, CacheStore } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import { UserService } from './users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ChatModule } from './chat/chat.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { UploadService } from './upload/upload.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    JwtModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ChatModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: 'public/images/uploads',
      serveRoot: '/avatar',
    }),
  ],
  controllers: [AppController],
  // providers: [AppService, UserService, JwtService, UploadService],
  providers: [AppService, UserService, JwtService],
})
export class AppModule {}
