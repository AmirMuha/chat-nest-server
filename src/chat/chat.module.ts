import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Chat } from './entities/chat.entity';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [MikroOrmModule.forFeature([Chat]), RoomsModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
