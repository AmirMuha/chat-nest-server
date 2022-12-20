import { HttpStatus, Injectable } from '@nestjs/common';
import { clean } from 'src/common/helpers/clean.helper';
import { CreateTagDto } from './dto/create-tag.dto';
import { FilterTagsDto } from './dto/filter-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TAGS_SELECT } from './tags.constant';
import { TagRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(private readonly repo: TagRepository) {}

  async create(data: CreateTagDto, user: IUserPayload) {
    const result = this.repo.create({ tag_name: data.name, tag_created_by_id: user.id });
    this.repo.persist(result);
    await this.repo.flush();
    return {
      user,
      result,
      status: HttpStatus,
    };
  }

  async findAll(filters: FilterTagsDto, user: IUserPayload) {
    const qb = this.repo.qb();
    console.log(
      clean({
        tag_name: { $contains: filters.name },
        tag_created_by_id: filters.created_by_id,
      }),
    );
    const result = await qb
      .select(TAGS_SELECT)
      .where(
        clean({
          tag_name: { $contains: filters.name },
          tag_created_by_id: filters.created_by_id,
        }),
      )
      .execute();
    return {
      user,
      result,
      status: HttpStatus.OK,
    };
  }

  async findOneById(id: number, user: IUserPayload) {
    const qb = this.repo.qb();
    const result = await qb.select(TAGS_SELECT).where({ tag_id: id }).execute();
    return {
      user,
      result,
      status: HttpStatus.OK,
    };
  }

  async updateOneById(data: UpdateTagDto, user: IUserPayload) {
    const qb = this.repo.qb();
    const result = await qb
      .select(TAGS_SELECT)
      .update({
        tag_name: data.name,
      })
      .where({ tag_id: data.id })
      .execute();
    return {
      user,
      result,
      status: HttpStatus.OK,
    };
  }

  async removeOneById(id: string, user: IUserPayload) {
    const qb = this.repo.qb();
    await qb.delete().where({ tag_id: id }).execute();
    return {
      user,
      status: HttpStatus.OK,
    };
  }

  async removeMany(ids: string[], user: IUserPayload) {
    const qb = this.repo.qb();
    await qb.delete().where({ 'tag_id IN': ids }).execute();
    return {
      user,
      status: HttpStatus.OK,
    };
  }
}
