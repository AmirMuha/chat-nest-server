import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager) {}

  async getOneByUsername(username: string) {
    const user = [
      {
        user_id: '93630b4e-c7a3-46f0-9292-9db4d35d3970',
        user_username: 'amirmuha',
        user_first_name: 'AmirMohammad',
        user_last_name: 'MirzaeiRad',
        user_password: '',
      },
    ];
    return user[0];
  }
}
