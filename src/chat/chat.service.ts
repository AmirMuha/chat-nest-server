import { EntityManager } from '@mikro-orm/postgresql';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CHAT_SELECT } from './chat.constant';
import { ChatRepository } from './chat.repository';
import { CreateChatDto } from './dto/create-chat.dto';
import { FilterChatDto } from './dto/filter-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(private readonly repo: ChatRepository, private readonly em: EntityManager) {}
  async create(data: CreateChatDto) {
    const qb = this.em.fork().createQueryBuilder(Chat);
    const result = await qb.select(CHAT_SELECT).insert(data).execute();
    return {
      result,
      status: HttpStatus.CREATED,
    };
  }

  async findAll(filters: FilterChatDto) {
    const qb = this.em.fork().createQueryBuilder(Chat, 'chat');
    const chats = await qb.select(CHAT_SELECT).where({ chat_deleted: false }).execute();
    return {
      result: chats,
      status: HttpStatus.OK,
    };
  }

  async update(data: UpdateChatDto) {
    const qb = this.em.fork().createQueryBuilder(Chat);
    const chat_count = await qb.count().where({ chat_id: data.chat_id }).execute();
    if (chat_count[0].count === 0) throw new NotFoundException('پیامی با آیدی وارد شده یافت نشد.');
    const result = await qb.select(CHAT_SELECT).update(data).where({ chat_id: data.chat_id }).execute();
    return {
      result,
      status: HttpStatus.OK,
    };
  }

  async removeOne(id: string) {
    const qb = this.em.fork().createQueryBuilder(Chat);
    const chat_count = await qb.count().where({ chat_id: id }).execute();
    if (chat_count[0].count === 0) throw new NotFoundException('پیامی با آیدی وارد شده یافت نشد.');
    await qb.select(CHAT_SELECT).delete().where({ chat_id: id }).execute();
    await this.repo.nativeDelete({ chat_id: id });
    return {
      status: HttpStatus.OK,
    };
  }

  async removeMany(ids: string[]) {
    const qb = this.em.fork().createQueryBuilder(Chat);
    const result = await qb.select(CHAT_SELECT).delete().where({ 'chat_id IN': ids }).execute('all');
    return {
      result,
      status: HttpStatus.OK,
    };
  }
}
