import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class UserService {
  constructor(@Inject('AUTH_MICROSERVICE_TOKEN') private readonly client: ClientProxy, private readonly em: EntityManager) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(filters: FilterUserDto, user: IUserPayload) {
    const resultObs = this.client.send('user/find/many', filters);
    const result = await lastValueFrom(
      resultObs.pipe(
        catchError((err) => {
          console.error(err);
          throw new InternalServerErrorException(err);
        }),
        map((v) => v),
      ),
    );
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
