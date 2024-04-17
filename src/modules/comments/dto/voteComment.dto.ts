import {
  IsArray,
  IsBoolean,
  isInt,
  IsInt,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { IsNull } from 'typeorm';

export class VoteCommentDTO {
  @IsInt()
  comment_id: number;

  @IsInt()
  user_id: number;

  @IsBoolean()
  is_upvote: boolean;
}
