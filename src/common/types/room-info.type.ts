import { ERoomTypes } from 'src/rooms/entities/room.entity';

export class RoomInfoDto {
  id: string;
  name: string;
  type: ERoomTypes;
  name_id: string;
  parent_id: string;
  settings: { room_settings_background_image?: string; room_settings_description?: string; room_settings_image?: string };
}
