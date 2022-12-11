import { t, DateType, Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey({ type: t.uuid })
  user_id: string = v4();

  @Property({ type: 'varchar', length: 50 })
  user_first_name: string;

  @Property({ type: 'varchar', length: 50 })
  user_last_name: string;

  @Property({ type: 'varchar', length: 55 })
  user_username: string;

  @Property({ type: 'varchar', length: 11 })
  user_phone_number: string;

  @Property({ type: DateType, defaultRaw: 'NOW()' })
  user_create_at: Date;

  @Property({ type: DateType })
  user_signed_in_at?: Date;

  @Property({ type: DateType })
  user_updated_at?: Date;

  @Property({ type: DateType })
  user_deleted_at?: Date;

  @Property({ type: 'boolean', default: false })
  user_deleted?: boolean;
}
