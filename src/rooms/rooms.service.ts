import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './rooms.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { Room } from './entities/room.entity';
import { FilterRoomDto } from './dto/filter-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly em: EntityManager, private readonly repo: RoomRepository) {}

  async create(data: CreateRoomDto, user: IUserPayload) {
    const repo = this.em.fork().getRepository(Room);
    const result = repo.create({ ...data, room_created_by_id: user.id });
    repo.persist(result);
    await repo.flush();
    return {
      user,
      result,
      status: HttpStatus.OK,
    };
  }

  async findAll(filters: FilterRoomDto, user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room);
    const foundRooms = await qb.select(['room_id', 'room_name', 'room_created_at', 'room_updated_at']).where({ room_deleted: false }).execute();
    return {
      user,
      result: foundRooms,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string, user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room);
    const foundRoom = await qb.select(['room_id', 'room_name', 'room_created_at', 'room_updated_at']).where({ room_id: id }).execute();
    return {
      user,
      result: foundRoom,
      status: HttpStatus.OK,
    };
  }

  async update(data: UpdateRoomDto, user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room);
    const result = await qb
      .select(['room_id', 'room_name', 'room_created_at', 'room_updated_at'])
      .update(data)
      .where({ room_id: data.room_id })
      .execute('get');
    return {
      user,
      result,
      status: HttpStatus.OK,
    };
  }

  async removeOne(id: string, user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room);
    const result = await qb.select(['room_id', 'room_name', 'room_created_at', 'room_updated_at']).delete().where({ room_id: id }).execute('get');
    return {
      user,
      result,
      status: HttpStatus.OK,
    };
  }

  async removeMany(ids: string[], user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room);
    const result = await qb
      .select(['room_id', 'room_name', 'room_created_at', 'room_updated_at'])
      .delete()
      .where({ 'room_id IN': ids })
      .execute('all');
    return {
      user,
      result,
      status: HttpStatus.OK,
    };
  }
}
