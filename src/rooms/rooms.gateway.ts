import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Server } from 'ws';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('room/create')
  async create(client: Socket, data: CreateRoomDto) {
    return await this.roomsService.create(data);
  }

  @SubscribeMessage('room/join')
  async join(client: Socket, room_id: string) {
    await client.join(room_id);
  }

  @SubscribeMessage('room/leave')
  async leave(client: Socket, room_id: string) {
    await client.leave(room_id);
  }

  @SubscribeMessage('room/find')
  async findAll() {
    return await this.roomsService.findAll();
  }

  @SubscribeMessage('room/find-one')
  async findOne(client: Socket, id: string) {
    return await this.roomsService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  async update(client: Socket, data: UpdateRoomDto) {
    return await this.roomsService.update(data);
  }

  @SubscribeMessage('removeRoom')
  async remove(client: Socket, id: string) {
    return await this.roomsService.removeOne(id);
  }

  @SubscribeMessage('removeRoom')
  async removeMany(client: Socket, ids: string[]) {
    return await this.roomsService.removeMany(ids);
  }
}
