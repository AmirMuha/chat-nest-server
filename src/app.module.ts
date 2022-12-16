import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MikroOrmModule.forRoot(), AuthModule, TagsModule, ChatModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
