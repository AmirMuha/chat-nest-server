import {
  t,
  Entity,
  Property,
  PrimaryKey,
  JsonType,
  ArrayType,
  EntityRepositoryType,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ChatRepository } from '../chat.repository';
import { ChatContentType } from './chat.entity.type';

@Entity({ customRepository: () => ChatRepository })
export class Chat {
  [EntityRepositoryType]: ChatRepository;
  @PrimaryKey({ type: t.uuid })
  chat_id: string = v4();

  @Property({ type: JsonType })
  chat_content?: ChatContentType[];

  @Property({ type: t.uuid })
  chat_room_id?: string;

  @Property({ type: t.uuid })
  chat_sent_by_id?: string;

  @Property({ type: ArrayType<string> })
  chat_sent_to_ids?: string[];

  @Property({ type: ArrayType<string> })
  chat_tags_ids?: string[];

  @Property()
  chat_deleted?: boolean = false;

  @Property()
  chat_created_at?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  chat_updated_at?: Date;

  @Property()
  chat_deleted_at?: Date;
}
