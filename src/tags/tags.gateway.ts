import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@WebSocketGateway()
export class TagsGateway {
  constructor(private readonly tagsService: TagsService) {}

  @SubscribeMessage('tags/create')
  async create(@MessageBody() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @SubscribeMessage('tags/find')
  async findAll() {
    return this.tagsService.findAll();
  }

  @SubscribeMessage('tags/update')
  async update(@MessageBody() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(updateTagDto.id, updateTagDto);
  }

  @SubscribeMessage('tags/delete')
  async remove(@MessageBody() id: number) {
    return this.tagsService.remove(id);
  }
}
