import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ChatContentType } from '../entities/chat.entity.type';

export class CreateChatContentBlockTypeDto {
  @IsNotEmpty()
  @IsEnum(['paragraph', 'header', 'list', 'image'])
  type: 'paragraph' | 'header' | 'list' | 'image';
  @IsNotEmpty()
  @IsObject()
  data: {
    text: string;
    level: number;
    items: string[];
    style: string;
    file: { url: string };
    caption: string;
    stretched: boolean;
    withBorder: boolean;
    withBackground: boolean;
  };
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class CreateChatContentTypeDto implements ChatContentType {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChatContentBlockTypeDto)
  blocks: CreateChatContentBlockTypeDto[];
  @IsNotEmpty()
  @IsString()
  version: string;
  @IsNotEmpty()
  @IsInt()
  time: number;
}

export class CreateChatDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  chat_sent_to_ids?: string[];
  @IsOptional()
  @IsString()
  chat_sent_by_id?: string;
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateChatContentTypeDto)
  chat_content?: CreateChatContentTypeDto;
  @IsOptional()
  @IsString()
  chat_room_id?: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  chat_tags_ids?: string[];
}
