import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import { FilterChatDto } from './dto/filter-chat.dto';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from 'src/auth/ws-auth.guard';
import { WsUser } from 'src/common/decorators/ws-user.decorator';
import { RoomInfoDto } from 'src/common/types/room-info.type';

@WebSocketGateway({ cors: { origin: ['http://localhost:4201'], credentials: true } })
@UseGuards(WsGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chat/create')
  async create(@ConnectedSocket() client: Socket, @MessageBody() [data, room]: [CreateChatDto, RoomInfoDto], @WsUser() user: IUserPayload) {
    const result = await this.chatService.create(data, user);
    client.in(room.id).emit('chat/create', result);
  }

  @SubscribeMessage('chat/find')
  async findAll(@ConnectedSocket() client: Socket, @MessageBody() [filters, room]: [FilterChatDto, RoomInfoDto], @WsUser() user: IUserPayload) {
    const result = await this.chatService.findAll(filters, user);
    client.in(room.id).emit('chat/find', result);
  }

  @SubscribeMessage('chat/update')
  async update(@ConnectedSocket() client: Socket, @MessageBody() [data, room]: [UpdateChatDto, RoomInfoDto], @WsUser() user: IUserPayload) {
    const result = await this.chatService.update(data, user);
    client.in(room.id).emit('chat/update', result);
  }

  @SubscribeMessage('chat/delete')
  async removeOne(@ConnectedSocket() client: Socket, @MessageBody() [id, room]: [string, RoomInfoDto], @WsUser() user: IUserPayload) {
    const result = await this.chatService.removeOne(id, user);
    client.in(room.id).emit('chat/delete', result);
  }

  @SubscribeMessage('chat/delete/many')
  async removeMany(@ConnectedSocket() client: Socket, @MessageBody() [ids, room]: [string[], RoomInfoDto], @WsUser() user: IUserPayload) {
    const result = await this.chatService.removeMany(ids, user);
    client.in(room.id).emit('chat/delete/many', result);
  }
}
