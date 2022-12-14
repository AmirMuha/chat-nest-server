import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  room_name: string;
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  room_created_by_id: string;
}
