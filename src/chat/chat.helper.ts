import { ChatRepository } from './chat.repository';
import { CreateChatDto } from './dto/create-chat.dto';

export class ChatHelper {
  constructor(private readonly repo: ChatRepository) {}
}
