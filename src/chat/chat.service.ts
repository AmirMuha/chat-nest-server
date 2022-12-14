import { EntityManager } from '@mikro-orm/postgresql';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { BaseEntityRepository } from 'src/common/repositories/base.repository';
import { ChatRepository } from './chat.repository';
import { CreateChatDto } from './dto/create-chat.dto';
import { FilterChatDto } from './dto/filter-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly repo: ChatRepository,
    private readonly em: EntityManager,
  ) {}
  async create(data: CreateChatDto) {
    const created_user = this.repo.create(data);
    this.repo.persist(created_user);
    await this.repo.flush();
    return created_user;
  }

  async findAll(filters: FilterChatDto) {
    const qb = this.em.createQueryBuilder(Chat, 'chat');
    const users = await qb
      .select([
        'chat_id',
        'chat_content',
        'chat_room_id',
        'chat_tags_ids',
        'chat_sent_to_ids',
        'chat_sent_by_id',
        'chat_created_at',
        'chat_updated_at',
        'chat_deleted_at',
        'chat_deleted',
      ])
      .where({ chat_deleted: false })
      // .join(
      //   'auth-system',
      //   'user',
      //   'user.user_id = chat_sent_by_id',
      //   'innerJoin',
      // )
      .execute();
    return {
      result: users,
      status: HttpStatus.OK,
    };
  }

  async update(data: UpdateChatDto) {
    const chat_count = await this.repo.count({ chat_id: data.id });
    if (chat_count === 0)
      throw new NotFoundException('پیامی با آیدی وارد شده یافت نشد.');
    await this.repo.nativeUpdate({ chat_id: data.id }, data);
    return {
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    const chat_count = await this.repo.count({ chat_id: id });
    if (chat_count === 0)
      throw new NotFoundException('پیامی با آیدی وارد شده یافت نشد.');
    await this.repo.nativeDelete({ chat_id: id });
    return {
      status: HttpStatus.OK,
    };
  }
}
