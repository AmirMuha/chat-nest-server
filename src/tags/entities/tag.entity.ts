import {
  Entity,
  Property,
  PrimaryKey,
  t,
  OneToOne,
  ManyToOne,
} from '@mikro-orm/core';
import { User } from 'src/users/entities/user.entity';
import { v4 } from 'uuid';

@Entity()
export class Tags {
  @PrimaryKey({ type: t.uuid })
  tag_id: string = v4();

  @Property()
  tag_deleted?: boolean = false;

  @Property({ type: t.uuid })
  tag_created_by_user_id?: string;

  @Property()
  tag_created_at?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  tag_updated_at?: Date;

  @Property()
  tag_deleted_at?: Date;
}
