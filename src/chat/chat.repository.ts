import { EntityRepository } from '@mikro-orm/postgresql';
import { Chat } from './entities/chat.entity';

export class ChatRepository extends EntityRepository<Chat> {}
