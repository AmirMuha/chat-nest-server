import { EntityRepository } from '@mikro-orm/core';

export class BaseEntityRepository<
  Entity extends object,
> extends EntityRepository<Entity> {
  paginate(entity: Entity) {}
  paginateMany() {}
}
