import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chat/create')
  async create(@MessageBody() createChatDto: CreateChatDto) {
    return await this.chatService.create(createChatDto);
  }

  @SubscribeMessage('chat/find')
  async findAll(client: Socket) {
    client.emit('chat/find', 'Recieved');
    return await this.chatService.findAll();
  }

  @SubscribeMessage('chat/update')
  async update(@MessageBody() updateChatDto: UpdateChatDto) {
    return await this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('chat/delete')
  async remove(@MessageBody() id: number) {
    return await this.chatService.remove(id);
  }
}
