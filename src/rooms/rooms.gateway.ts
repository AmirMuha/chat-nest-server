import { WebSocketGateway, SubscribeMessage, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Server } from 'ws';
import { Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from 'src/auth/ws-auth.guard';
import { WsUser } from 'src/common/decorators/ws-user.decorator';
import { FilterRoomDto } from './dto/filter-room.dto';

@WebSocketGateway(parseInt(process.env.PORT), {
  transports: ['polling', 'websocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    withCredentials: true,
    allowedHeaders: ['authorization', 'room_id', 'room_name', 'room_name_id'],
  },
})
@UseGuards(WsGuard)
export class RoomsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('room/create')
  async create(@ConnectedSocket() client: Socket, @MessageBody() data: CreateRoomDto, @WsUser() user: IUserPayload) {
    const result = await this.roomsService.create(data, user);
    client.emit('room/create', result);
  }

  @SubscribeMessage('room/join')
  async join(@ConnectedSocket() client: Socket, @MessageBody() room_id: string, @WsUser() user: IUserPayload) {
    await client.join(room_id);
  }

  @SubscribeMessage('room/leave')
  async leave(@ConnectedSocket() client: Socket, @MessageBody() room_id: string, @WsUser() user: IUserPayload) {
    await client.leave(room_id);
  }

  @SubscribeMessage('room/find/many')
  async findAll(@ConnectedSocket() client: Socket, @MessageBody() filters: FilterRoomDto, @WsUser() user: IUserPayload) {
    const results = await this.roomsService.findAll(filters, user);
    client.emit('room/find', results);
  }

  @SubscribeMessage('room/find/many/with-last-message')
  async findAllWithLastMessage(@ConnectedSocket() client: Socket, @MessageBody() filters: FilterRoomDto, @WsUser() user: IUserPayload) {
    const results = await this.roomsService.findAllWithLastMessage(filters, user);
    client.emit('room/find/many/with-last-message', results);
  }

  @SubscribeMessage('room/find/one/by-id')
  async findOne(@ConnectedSocket() client: Socket, @MessageBody() id: string, @WsUser() user: IUserPayload) {
    const result = await this.roomsService.findOne(id, user);
    client.emit('room/find-one', result);
  }

  @SubscribeMessage('room/update')
  async update(@ConnectedSocket() client: Socket, @MessageBody() data: UpdateRoomDto, @WsUser() user: IUserPayload) {
    const result = await this.roomsService.update(data, user);
    client.emit('room/update', result);
  }

  @SubscribeMessage('room/remove')
  async remove(@ConnectedSocket() client: Socket, @MessageBody() id: string, @WsUser() user: IUserPayload) {
    const result = await this.roomsService.removeOne(id, user);
    client.emit('room/remove/many', result);
  }

  @SubscribeMessage('room/remove/many')
  async removeMany(@ConnectedSocket() client: Socket, @MessageBody() ids: string[], @WsUser() user: IUserPayload) {
    const result = await this.roomsService.removeMany(ids, user);
    client.emit('room/remove/many', result);
  }
}
