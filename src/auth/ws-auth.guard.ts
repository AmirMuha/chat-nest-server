import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    const ctx = context as any;
    const authBearerToken = ctx.args[0].handshake.headers.authorization ?? ctx.args[0].handshake?.auth?.token;
    const token = authBearerToken?.split(' ')[1];
    if (!authBearerToken || !token) return false;
    const room_id = ctx.args[0].handshake.headers.room_id;
    const decoded = await this.authService.validateToken(token);
    const user = await lastValueFrom(
      decoded.pipe(
        catchError((err) => {
          console.error(err);
          throw new InternalServerErrorException(err);
        }),
        map((v) => v),
      ),
    );
    if (user) {
      ctx.args[0].user = { ...user, password: undefined };
      ctx.args[0].chat_room_id = room_id;
      return user;
    } else throw new UnauthorizedException('لطفا دوباره وارد شوید');
  }
}
