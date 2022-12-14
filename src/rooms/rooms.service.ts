import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './rooms.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    private readonly em: EntityManager,
    private readonly repo: RoomRepository,
  ) {}

  async create(data: CreateRoomDto) {
    const qb = this.em.createQueryBuilder(Room);
    const result = await qb
      .select(['room_id', 'room_name', 'room_created_at', 'room_updated_at'])
      .insert(data)
      .execute('get');
    return {
      result,
      status: HttpStatus.OK,
    };
  }

  async findAll() {
    const qb = this.em.createQueryBuilder(Room);
    const foundRooms = await qb
      .select(['room_id', 'room_name', 'room_created_at', 'room_updated_at'])
      .where({ room_deleted: false })
      .execute();
    return {
      result: foundRooms,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const qb = this.em.createQueryBuilder(Room);
    const foundRoom = await qb
      .select(['room_id', 'room_name', 'room_created_at', 'room_updated_at'])
      .where({ room_id: id })
      .execute();
    return {
      result: foundRoom,
      status: HttpStatus.OK,
    };
  }

  async update(data: UpdateRoomDto) {
    const qb = this.em.createQueryBuilder(Room);
    const result = await qb
      .select(['room_id', 'room_name', 'room_created_at', 'room_updated_at'])
      .update(data)
      .where({ room_id: data.room_id })
      .execute('get');
    return {
      result,
      status: HttpStatus.OK,
    };
  }

  async removeOne(id: string) {
    const qb = this.em.createQueryBuilder(Room);
    const result = await qb
      .select(['room_id', 'room_name', 'room_created_at', 'room_updated_at'])
      .delete()
      .where({ room_id: id })
      .execute('get');
    return {
      result,
      status: HttpStatus.OK,
    };
  }

  async removeMany(ids: string[]) {
    const qb = this.em.createQueryBuilder(Room);
    const result = await qb
      .select(['room_id', 'room_name', 'room_created_at', 'room_updated_at'])
      .delete()
      .where({ 'room_id IN': ids })
      .execute('all');
    return {
      result,
      status: HttpStatus.OK,
    };
  }
}
