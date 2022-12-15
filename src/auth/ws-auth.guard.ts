import { CanActivate, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: any): Promise<boolean | any> {
    console.log(context.args[0].handshake);
    console.log('----------------------------------------');
    console.log(context.args[0].handshake);
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(bearerToken, {
      secret: process.env.JWT_SECRET,
    });
    const user = await axios.get(
      `${process.env.AUTH_SYSTEM_SERVER_URL}/users/${decoded.username}/username`,
      {
        headers: {
          authorization: context.args[0].handshake.headers.authorization,
        },
      },
    );
    console.log(user);
    if (!!user.data.result) return true;
    else return false;
  }
}
