import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Chat])],
  providers: [ChatGateway, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
