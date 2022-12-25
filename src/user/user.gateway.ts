import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Server, Socket } from 'socket.io';
import { WsUser } from 'src/common/decorators/ws-user.decorator';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from 'src/auth/ws-auth.guard';
import { FilterUserDto } from './dto/filter-user.dto';

@WebSocketGateway({ cors: { origin: ['http://localhost:4201'], credentials: true } })
@UseGuards(WsGuard)
export class UserGateway {
  @WebSocketServer()
  private readonly server: Server;
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('user/create')
  create(@ConnectedSocket() socket: Socket, @MessageBody() data: CreateUserDto, @WsUser() user: IUserPayload) {
    return this.userService.create(data);
  }

  @SubscribeMessage('user/find/many')
  async findAll(@ConnectedSocket() socket: Socket, @MessageBody() filters: FilterUserDto, @WsUser() user: IUserPayload) {
    const result = await this.userService.findAll(filters, user);
    socket.emit('user/find/many', result);
  }

  @SubscribeMessage('user/find/one')
  findOne(@ConnectedSocket() socket: Socket, @MessageBody() id: number) {
    return this.userService.findOne(id);
  }

  @SubscribeMessage('user/update')
  update(@ConnectedSocket() socket: Socket, @MessageBody() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @SubscribeMessage('user/remove')
  remove(@ConnectedSocket() socket: Socket, @MessageBody() id: number) {
    return this.userService.remove(id);
  }
}
