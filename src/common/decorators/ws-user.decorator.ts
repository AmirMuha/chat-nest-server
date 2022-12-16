import { createParamDecorator } from '@nestjs/common';

export const WsUser = createParamDecorator((_, request): IUserPayload => {
  return request.args[0].user;
});
