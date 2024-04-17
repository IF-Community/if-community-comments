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
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, DataSource, Repository, WithoutId } from 'typeorm';
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
    @InjectRepository(CommentsModel) private commentModel: Repository<CommentsModel>,
    @InjectRepository(VotesModel) private votesModel: Repository<VotesModel>,
    private dataSource: DataSource
  ) {}

  //CRUD
  @Get()
  async getAll() {
    //Apenas comentários ativos
    const commentList = await this.commentModel.findBy({active: true})

    return commentList;
  }

  @Post()
  async postComment(@Body() body: CreateCommentDTO) {
    const newComment: Omit<CommentsModel, 'comment_id'> = {
      ...body,
      active: true,
      created_at: new Date(),
      votes: []
    };

    await this.commentModel.save(newComment);
    return { message: 'Comentário registrado!', comment: newComment };
  }

  @Put(':id')
  async editComment(@Param('id') id: number, @Body() body: EditCommentDTO) {
    const editingComment = await this.commentModel.findOneBy({ comment_id: id });
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
    await this.commentModel.update({ comment_id: id }, { ...comment, active: false });

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

    return {message: 'Comentários salvo com sucesso!'}
  }
}
