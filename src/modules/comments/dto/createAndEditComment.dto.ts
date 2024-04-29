import {
  IsInt,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class CreateCommentDTO {
  @ValidateIf((obj, value) => value == Number)
  parent_id: number;
  @IsInt()
  user_id: number;
  @IsInt()
  post_id: number;
  @IsString()
  @MaxLength(500)
  content: string;
}

export class EditCommentDTO {
  @IsString()
  @MaxLength(500)
  content: string;
}
