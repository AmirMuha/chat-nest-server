import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Room } from './entities/room.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Room])],
  providers: [RoomsGateway, RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
