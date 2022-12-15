import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket } from 'socket.io';
import { FilterChatDto } from './dto/filter-chat.dto';
import { Server } from 'ws';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from 'src/auth/ws-auth.guard';

@WebSocketGateway()
@UseGuards(WsGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chat/create')
  async create(socket: Socket, data: CreateChatDto) {
    const created_chat = await this.chatService.create(data);
    socket.emit('chat/create', created_chat);
  }

  @SubscribeMessage('chat/find')
  async findAll(socket: Socket, filters: FilterChatDto) {
    const result = await this.chatService.findAll(filters);
    socket.emit('chat/find', result);
    return result;
  }

  @SubscribeMessage('chat/update')
  async update(socket: Socket, data: UpdateChatDto) {
    return await this.chatService.update(data);
  }

  @SubscribeMessage('chat/delete')
  async removeOne(socket: Socket, id: string) {
    return await this.chatService.removeOne(id);
  }

  @SubscribeMessage('chat/delete')
  async removeMany(socket: Socket, ids: string[]) {
    return await this.chatService.removeMany(ids);
  }
}
