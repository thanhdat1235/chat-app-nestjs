import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Conversations, Messages, Prisma, Participants } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createConversation(
    userId: string,
    title: string,
  ): Promise<Conversations> {
    try {
      const newConversation = await this.prisma.conversations.create({
        data: {
          title: title,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return newConversation;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createParticipant(
    userId: string,
    conversationId: string,
  ): Promise<Participants> {
    try {
      const newParticipant = await this.prisma.participants.create({
        data: {
          conversation: {
            connect: {
              id: conversationId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return newParticipant;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findConversationByUserID(userID: string): Promise<Conversations> {
    try {
      return await this.prisma.conversations.findUnique({
        where: {
          creator_id: userID,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findParticipantByUserIDvsConversationID(
    userID: string,
    conversationID: string,
  ): Promise<Participants[]> {
    try {
      return await this.prisma.participants.findMany({
        where: {
          users_id: userID,
          conversation_id: conversationID,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createMessage(
    senderID: string,
    conversationID: string,
    message: string,
  ): Promise<Messages> {
    try {
      return await this.prisma.messages.create({
        data: {
          sender: {
            connect: {
              id: senderID,
            },
          },
          conversation: {
            connect: {
              id: conversationID,
            },
          },
          message: message,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
