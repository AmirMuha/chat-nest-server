import { Tags } from './entities/tag.entity';

export const TAGS_SELECT: (keyof Tags)[] = ['tag_id', 'tag_name', 'tag_updated_at', 'tag_created_at', 'tag_created_by_id'];
