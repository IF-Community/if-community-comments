import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  CreateCommentDTO,
  EditCommentDTO,
} from './dto/createAndEditComment.dto';
import { CommentsModel } from './entities/comments.model';
import { VoteCommentDTO } from './dto/voteComment.dto';
import { ApiKeyGuard } from 'src/app.service';
import { VotesModel } from './entities/votes.model';

@UseGuards(ApiKeyGuard)
@Controller('/comments')
export class CommentsController {
  constructor(
    @InjectRepository(CommentsModel)
    private commentModel: Repository<CommentsModel>,
    @InjectRepository(VotesModel) private votesModel: Repository<VotesModel>,
  ) {}

  //CRUD
  @Get()
  async getAll() {
    //Apenas comentários ativos
    const commentList = await this.commentModel.findBy({ active: true });

    const commentWithVotes = await Promise.all(
      commentList.map(async (comment) => {
        const commentVotes = await this.votesModel.findBy({
          comment_id: comment.comment_id,
        });
        return {
          ...comment,
          votes: commentVotes,
        };
      }),
    );
    return commentWithVotes;
  }

  @Post()
  async postComment(@Body() body: CreateCommentDTO) {
    const newComment = new CommentsModel();
    newComment.post_id = body.post_id;
    newComment.user_id = body.user_id;
    newComment.content = body.content;
    newComment.parent_id = body.parent_id;
    newComment.active = true;

    await this.commentModel.save(newComment);
    return { message: 'Comentário registrado!', comment: newComment };
  }

  @Put(':id')
  async editComment(@Param('id') id: number, @Body() body: EditCommentDTO) {
    const editingComment = await this.commentModel.findOneBy({
      comment_id: id,
    });
    const editedComment: Omit<CommentsModel, 'comment_id'> = {
      ...editingComment,
      ...body,
    };

    await this.commentModel.update({ comment_id: id }, editedComment);

    return { message: 'Comentário editado!', comment: editedComment };
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    const comment = await this.commentModel.findOneBy({ comment_id: id });
    await this.commentModel.update(
      { comment_id: id },
      { ...comment, active: false },
    );

    return {
      message: 'Comentário removido (softdelete)',
      comment: { ...comment, active: false },
    };
  }

  @Delete('harddelete/:id')
  async hardDeleteComment(@Param('id') id: number) {
    await this.commentModel.delete({ comment_id: id });

    return { message: 'Comentário removido (harddelete)' };
  }

  @Patch('add-vote/')
  async addUpVote(@Body() body: VoteCommentDTO) {
    const votefind = await this.votesModel.findOneBy({
      user_id: body.user_id,
      comment_id: body.comment_id,
    });

    if (votefind) {
      await this.votesModel.delete({ vote_id: votefind.vote_id });
      return { message: 'voto removido!' };
    }

    await this.votesModel.save({
      user_id: body.user_id,
      is_upvote: body.is_upvote,
      comment_id: body.comment_id,
    });

    return { message: 'Voto adicionado com sucesso!' };
  }
}
