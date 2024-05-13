import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.model';
import { VotesModel } from './entities/votes.model';
import { CommentsModel } from './entities/comments.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(VotesModel) private votesModel: Repository<VotesModel>,
    @InjectRepository(UsersModel) private UsersModel: Repository<UsersModel>,
  ) {}

  async getVotesAndUsers(commentList: CommentsModel[]) {
    const commentWithVotesAndUsers = await Promise.all(
      commentList.map(async (comment) => {
        const commentVotes = await this.votesModel.findBy({
          comment_id: comment.comment_id,
        });
        const commentUser = await this.UsersModel.findOneBy({
          user_id: comment.user_id,
        });
        delete comment.user_id;
        return {
          ...comment,
          votes: commentVotes,
          user: {
            user_id: commentUser.user_id,
            user_name: commentUser.user_name,
            user_image: commentUser.user_image,
          },
        };
      }),
    );
    return commentWithVotesAndUsers;
  }
}
