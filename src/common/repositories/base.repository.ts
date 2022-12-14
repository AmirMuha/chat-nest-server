import { EntityRepository } from '@mikro-orm/postgresql';

export class BaseEntityRepository<
  Entity extends object,
> extends EntityRepository<Entity> {
  paginate(entity: Entity) {}
  paginateMany() {}
}
