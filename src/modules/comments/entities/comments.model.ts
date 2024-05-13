import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VotesModel } from './votes.model';

@Entity()
export class CommentsModel {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ nullable: true })
  parent_id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  post_id: number;

  @Column({ length: 500 })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Column('boolean')
  active: boolean;
}
