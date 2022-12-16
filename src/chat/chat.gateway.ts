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

@WebSocketGateway()
@UseGuards(WsGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chat/create')
  async create(@ConnectedSocket() client: Socket, data: CreateChatDto, @WsUser() user: IUserPayload) {
    const created_chat = await this.chatService.create(data);
    client.emit('chat/create', created_chat);
  }

  @SubscribeMessage('chat/find')
  async findAll(@ConnectedSocket() client: Socket, @MessageBody() filters: FilterChatDto, @WsUser() user: IUserPayload) {
    const result = await this.chatService.findAll(filters);
    client.emit('chat/find', result);
  }

  @SubscribeMessage('chat/update')
  async update(@ConnectedSocket() client: Socket, @MessageBody() data: UpdateChatDto, @WsUser() user: IUserPayload) {
    const result = await this.chatService.update(data);
    client.emit('chat/update', result);
  }

  @SubscribeMessage('chat/delete')
  async removeOne(@ConnectedSocket() client: Socket, @MessageBody() id: string, @WsUser() user: IUserPayload) {
    const result = await this.chatService.removeOne(id);
    client.emit('chat/delete', result);
  }

  @SubscribeMessage('chat/delete/many')
  async removeMany(@ConnectedSocket() client: Socket, @MessageBody() ids: string[], @WsUser() user: IUserPayload) {
    const result = await this.chatService.removeMany(ids);
    client.emit('chat/delete/many', result);
  }
}
