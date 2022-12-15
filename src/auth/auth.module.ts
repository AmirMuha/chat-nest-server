import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { WsGuard } from './ws-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: `${parseInt(process.env.JWT_MAX_AGE_DAYS) * 24}h`,
      },
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy, WsGuard],
  exports: [AuthService],
})
export class AuthModule {}
