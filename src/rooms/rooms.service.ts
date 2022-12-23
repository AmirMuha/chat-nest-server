import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './rooms.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { Room } from './entities/room.entity';
import { FilterRoomDto } from './dto/filter-room.dto';
import { clean } from 'src/common/helpers/clean.helper';
import { Chat } from 'src/chat/entities/chat.entity';

@Injectable()
export class RoomsService {
  constructor(private readonly em: EntityManager, private readonly repo: RoomRepository) {}

  async create(data: CreateRoomDto, user: IUserPayload) {
    const repo = this.em.fork().getRepository(Room);
    const result = repo.create(
      clean({
        room_type: data.room_type,
        room_name: data.room_name,
        room_name_id: data.room_name_id,
        room_settings: data.room_settings,
        room_parent: { room_id: data.room_parent_id },
        room_created_by_id: user.id,
      }),
    );
    repo.persist(result);
    await repo.flush();
    return {
      user,
      result,
      status: HttpStatus.OK,
    };
  }

  async findAll(filters: FilterRoomDto, user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room, 'r');
    const foundRooms = await qb.select('*').where({ room_deleted: false }).leftJoin('r.room_chats', 'c').execute();
    return {
      user,
      result: foundRooms,
      status: HttpStatus.OK,
    };
  }

  async findAllWithLastMessage(filters: FilterRoomDto, user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room, 'r');
    const chat_qb = this.em.fork().createQueryBuilder(Chat, 'last_chat');
    const lastChat = chat_qb.select('chat_id').orderBy({ chat_created_at: 'DESC' }).limit(1).getKnexQuery();
    const foundRooms = await qb.select('*').where({ room_deleted: false }).join('r.room_chats', 'c', lastChat, 'innerJoin').execute();
    return {
      user,
      result: foundRooms,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string, user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room);
    const foundRoom = await qb.select('*').where({ room_id: id }).execute();
    return {
      user,
      result: foundRoom,
      status: HttpStatus.OK,
    };
  }

  async update(data: UpdateRoomDto, user: IUserPayload) {
    const qb = this.em.fork().createQueryBuilder(Room);
    const result = await qb.select('*').update(data).where({ room_id: data.room_id }).execute('get');
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
