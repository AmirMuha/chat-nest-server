import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    const ctx = context as any;
    if (!ctx.args[0].handshake.headers.authorization) return false;
    const token = ctx.args[0].handshake.headers.authorization.split(' ')[1];
    const decoded = await this.authService.validateToken(token);
    const user = await lastValueFrom(
      decoded.pipe(
        catchError((err) => {
          throw new InternalServerErrorException(err);
        }),
        map((v) => v),
      ),
    );
    if (user) {
      ctx.args[0].user = user;
      return user;
    } else throw new UnauthorizedException('لطفا دوباره وارد شوید');
  }
}
