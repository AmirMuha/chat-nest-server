import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Socket } from 'socket.io';
import { FilterTagsDto } from './dto/filter-tag.dto';
import { WsUser } from 'src/common/decorators/ws-user.decorator';

@WebSocketGateway()
export class TagsGateway {
  constructor(private readonly tagsService: TagsService) {}

  @SubscribeMessage('tags/create')
  async create(@ConnectedSocket() client: Socket, @MessageBody() data: CreateTagDto, @WsUser() user: IUserPayload) {
    const { result } = await this.tagsService.create(data, user);
    client.emit('tags/create', { user, result });
  }

  @SubscribeMessage('tags/find')
  async findAll(@ConnectedSocket() client: Socket, @MessageBody() filters: FilterTagsDto, @WsUser() user: IUserPayload) {
    const { result } = await this.tagsService.findAll(filters, user);
    client.emit('tags/find', { result, user });
  }

  @SubscribeMessage('tags/update')
  async update(@ConnectedSocket() client: Socket, @MessageBody() data: UpdateTagDto, @WsUser() user: IUserPayload) {
    const { result } = await this.tagsService.updateOneById(data, user);
    client.emit('tags/update', { result, user });
  }

  @SubscribeMessage('tags/delete')
  async remove(@ConnectedSocket() client: Socket, @MessageBody() id: string, @WsUser() user: IUserPayload) {
    await this.tagsService.removeOneById(id, user);
    client.emit('tags/delete', { user });
  }

  @SubscribeMessage('tags/delete/many')
  async removeMany(@ConnectedSocket() client: Socket, @MessageBody() ids: string[], @WsUser() user: IUserPayload) {
    await this.tagsService.removeMany(ids, user);
    client.emit('tags/delete/many', { user });
  }
}
