import { createParamDecorator } from '@nestjs/common';
import { ERoomTypes } from 'src/rooms/entities/room.entity';

export type ChatRoomInfo = {
  id: string;
  name?: string;
  type?: ERoomTypes;
  unique_name?: string;
};
export const ChatRoomInfo = createParamDecorator((_, request): ChatRoomInfo => {
  return {
    id: request.args[0].chat_room_id,
    type: request.args[0].chat_room_type,
    name: request.args[0].chat_room_name,
    unique_name: request.args[0].chat_room_unique_name,
  };
});
