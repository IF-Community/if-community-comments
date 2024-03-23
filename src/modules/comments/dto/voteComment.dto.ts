import { IsArray, isInt, IsInt, IsString, MaxLength, Min, ValidateIf } from 'class-validator';
import { IsNull } from 'typeorm';

export class VoteCommentDTO {
  @IsInt()
  reaction_by_user: number
}
