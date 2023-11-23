import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserService } from '../users/users.service';
import { Prisma, Conversations } from '@prisma/client';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { emit } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from './chat.service';

export interface IInformation {
  id: number | string;
  user_id: number | string | null;
  status: boolean;
  type: TypeInformation | null;
  value: string;
}

export enum TypeInformation {
  'socket_id' = 'socket_id',
  'device_id' = 'device_id',
}

@WebSocketGateway(4002, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:4002'],
    credentials: true,
  },
})
// OnGatewayConnection
export class ChatGateway implements OnGatewayInit, OnGatewayDisconnect {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private chatService: ChatService,
  ) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);

    // const user: Prisma.UsersCreateInput = await this.getDataUserFromCookie(
    //   client,
    // );

    // const information = {
    //   user_id: user.id,
    //   type: TypeInformation.socket_id,
    //   status: false,
    //   value: client.id,
    // };
  }

  async getDataUserFromCookie(
    client: Socket,
  ): Promise<Prisma.UsersCreateInput> {
    const authToken: any = parse(client.handshake.headers?.cookie).access;

    const decoded = this.jwtService.verify(authToken, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });

    try {
      const user = await this.userService.findOne(decoded.email);
      return user;
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  afterInit(server: Server) {
    console.log('Connect ');
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, payload): Promise<void> {
    const user = await this.getDataUserFromCookie(client);
    try {
      const newConversation = await this.chatService.createConversation(
        user.id,
        user.first_name + user.last_name,
      );
      await this.server.emit('repMessage', payload);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }
}
