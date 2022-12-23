import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Chat } from './entities/chat.entity';

@Module({
  controllers: [ChatController],
  imports: [MikroOrmModule.forFeature([Chat])],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
