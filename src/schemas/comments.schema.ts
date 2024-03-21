import { isInt, IsInt, IsString, MaxLength, Min, ValidateIf } from 'class-validator';
import { IsNull } from 'typeorm';

export class CommentsSchema {
  @ValidateIf((obj, value) => value == Number || value == null)
  parent_id: number | null;
	@IsInt()
  user_id: number;
  @IsInt()
  post_id: number;
	@IsString()
	@MaxLength(500)
  content: string;
}
