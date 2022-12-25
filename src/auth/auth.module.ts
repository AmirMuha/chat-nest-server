import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { WsGuard } from './ws-auth.guard';

@Global()
@Module({
  imports: [PassportModule],
  providers: [
    {
      provide: 'AUTH_MICROSERVICE_TOKEN',
      useFactory() {
        const { AUTH_SERVICE_PORT, AUTH_SERVICE_HOST } = process.env;
        return ClientProxyFactory.create({ transport: Transport.REDIS, options: { host: AUTH_SERVICE_HOST, port: parseInt(AUTH_SERVICE_PORT) } });
      },
    },
    AuthService,
    JwtStrategy,
    WsGuard,
  ],
  exports: [
    WsGuard,
    AuthService,
    {
      provide: 'AUTH_MICROSERVICE_TOKEN',
      useFactory() {
        const { AUTH_SERVICE_PORT, AUTH_SERVICE_HOST } = process.env;
        return ClientProxyFactory.create({ transport: Transport.REDIS, options: { host: AUTH_SERVICE_HOST, port: parseInt(AUTH_SERVICE_PORT) } });
      },
    },
  ],
})
export class AuthModule {}
