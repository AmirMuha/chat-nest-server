import { EntityManager } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager, @Inject('AUTH_MICROSERVICE_TOKEN') private readonly client: ClientProxy) {}

  async validateToken(token: string) {
    const decoded = this.client.send('auth/validate/token', token);
    return decoded;
  }

  async getOneByUsername(username: string) {
    const user_obs = this.client.send('user/find/by/username', username);
    return user_obs;
  }
}
