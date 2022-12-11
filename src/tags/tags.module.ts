import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsGateway } from './tags.gateway';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tags } from './entities/tag.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Tags])],
  providers: [TagsGateway, TagsService],
  exports: [TagsService],
})
export class TagsModule {}
