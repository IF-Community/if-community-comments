import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VotesModel {
  @PrimaryGeneratedColumn()
  vote_id: number;

  @Column('int')
  user_id: number;

  @Column('boolean')
  is_upvote: boolean;

  @Column('int')
  comment_id: number;
}
