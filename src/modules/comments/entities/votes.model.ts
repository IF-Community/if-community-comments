import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommentsModel } from './comments.model';

@Entity()
export class VotesModel {
  @PrimaryGeneratedColumn()
  vote_id: number;

  @Column('int')
  user_id: number;

  @Column('boolean')
  is_upvote: boolean;

  @ManyToOne(() => CommentsModel, CommentsModel => CommentsModel.comment_id)
  comment: CommentsModel
}
 