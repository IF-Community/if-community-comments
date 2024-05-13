import {
  IsBoolean,
  IsInt,
} from 'class-validator';

export class VoteCommentDTO {
  @IsInt()
  comment_id: number;

  @IsInt()
  user_id: number;

  @IsBoolean()
  is_upvote: boolean;
}
