import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager) {}

  async getOneByUsername(username: string) {
    const user = await axios.get(
      `${process.env.AUTH_SYSTEM_SERVER_URL}/users/${username}/username`,
    );
    console.log(user);
    return user.data.result;
  }
}
