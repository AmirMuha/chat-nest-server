import {
  t,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { RoomRepository } from '../rooms.repository';
import { v4 } from 'uuid';

@Entity({ customRepository: () => RoomRepository })
export class Room {
  [EntityRepositoryType]: RoomRepository;

  @PrimaryKey({ type: t.uuid })
  room_id: string = v4();

  @Property({ type: 'varchar', length: 50 })
  room_name: string;

  @Property({ type: t.uuid })
  room_created_by_id: string;

  @Property({ defaultRaw: 'NOW()' })
  room_created_at: Date;

  @Property()
  room_updated_at?: Date;

  @Property()
  room_deleted_at?: Date;

  @Property({ type: t.boolean })
  room_deleted = false;
}
