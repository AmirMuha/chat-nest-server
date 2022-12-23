import { Entity, Property, PrimaryKey, t, EntityRepositoryType, ManyToOne, Collection, ManyToMany } from '@mikro-orm/core';
import { Chat } from 'src/chat/entities/chat.entity';
import { v4 } from 'uuid';
import { TagRepository } from '../tags.repository';

@Entity({ customRepository: () => TagRepository })
export class Tags {
  [EntityRepositoryType]: TagRepository;

  @PrimaryKey({ type: t.uuid }) tag_id: string = v4();
  @Property({ type: 'varchar' }) tag_name: string;
  @Property() tag_deleted?: boolean = false;
  @Property({ type: t.uuid }) tag_created_by_id?: string;
  @Property() tag_created_at?: Date = new Date();
  @Property({ onUpdate: () => new Date() }) tag_updated_at?: Date;
  @Property() tag_deleted_at?: Date;
  @ManyToMany(() => Chat, 'chat_tags', { mappedBy: 'chat_tags', name: 'tag_chats_ids' }) tag_chats = new Collection<Chat>(this);
}
