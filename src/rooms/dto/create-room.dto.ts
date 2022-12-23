import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { ERoomTypes } from '../entities/room.entity';

export class CreateRoomSettingDto {
  @IsOptional()
  @IsString()
  room_settings_background_image?: string;
  @IsOptional()
  @IsString()
  room_settings_description?: string;
  @IsOptional()
  @IsString()
  room_settings_image?: string;
}

export class CreateRoomDto {
  @IsNotEmpty()
  @IsEnum(ERoomTypes)
  room_type: ERoomTypes;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateRoomSettingDto)
  room_settings?: CreateRoomSettingDto;
  @IsOptional()
  @IsString()
  room_parent_id?: string;
  @IsNotEmpty()
  @IsString()
  room_name_id: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  room_name: string;
}
