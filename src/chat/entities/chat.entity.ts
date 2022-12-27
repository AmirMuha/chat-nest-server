import { t, Entity, Property, PrimaryKey, JsonType, EntityRepositoryType, ManyToOne, OneToOne, Collection, ManyToMany, Enum } from '@mikro-orm/core';
import { Room } from 'src/rooms/entities/room.entity';
import { Tags } from 'src/tags/entities/tag.entity';
import { v4 } from 'uuid';
import { ChatRepository } from '../chat.repository';
import { ChatContentType } from './chat.entity.type';

@Entity({ customRepository: () => ChatRepository })
export class Chat {
  [EntityRepositoryType]: ChatRepository;
  @PrimaryKey({ type: t.uuid }) chat_id: string = v4();
  @Property({ type: JsonType }) chat_content: ChatContentType[];
  @Property({ type: t.uuid }) chat_sent_by_id: string;
  @Enum() chat_type: EChatTypes;
  @Property({ type: t.uuid }) chat_is_seen_by?: string[];
  @Property({ type: t.boolean }) chat_is_seen = false;
  @Property() chat_deleted?: boolean = false;
  @Property() chat_created_at?: Date = new Date();
  @Property() chat_updated_at?: Date;
  @Property() chat_deleted_at?: Date;
  @OneToOne(() => Chat, { nullable: true, name: 'chat_reply_to_id' }) chat_reply_to?: Chat;
  @ManyToOne(() => Room, { name: 'chat_room_id', nullable: false }) chat_room: Room;
  @ManyToMany(() => Tags) chat_tags = new Collection<Chat>(this);
}

export enum EChatTypes {
  GIF = 'GIF',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  GALLARY = 'GALLARY',
  RICH_TEXT = 'RICH_TEXT',
  ATTATCHMENT = 'ATTATCHMENT',
}
