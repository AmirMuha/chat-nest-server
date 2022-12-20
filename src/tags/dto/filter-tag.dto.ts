import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterTagsDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  created_by_id: string;
}
