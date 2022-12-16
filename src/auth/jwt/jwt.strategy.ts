import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any & { token: string }): Promise<Omit<any, 'password'>> {
    const user = await this.authService.getOneByUsername(payload.username);

    if (!user) throw new UnauthorizedException('لطفا دوباره وارد شوید.');
    return user;
  }
}
