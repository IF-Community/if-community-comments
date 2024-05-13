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
import { UsersModel } from './entities/users.model';
import { CommentsService } from './comments.service';

@UseGuards(ApiKeyGuard)
@Controller('/comments')
export class CommentsController {
  constructor(
    @InjectRepository(CommentsModel)
    private commentModel: Repository<CommentsModel>,
    @InjectRepository(VotesModel) private votesModel: Repository<VotesModel>,
    @InjectRepository(UsersModel) private UsersModel: Repository<UsersModel>,
    private commentsService: CommentsService
  ) {}

  //CRUD
  @Get()
  async getAll() {
    //Apenas comentários ativos
    const commentList = await this.commentModel.findBy({ active: true });

    return this.commentsService.getVotesAndUsers(commentList);
  }

  @Get('post/:id')
  async getByPostId(@Param('id') id: number) {
    console.log("aqui", id)
    const commentList = await this.commentModel.findBy({
      post_id: id,
      active: true,
    });
    console.log(commentList)

    return this.commentsService.getVotesAndUsers(commentList);
  }

  @Post()
  async postComment(@Body() body: CreateCommentDTO) {
    const newComment = new CommentsModel();
    newComment.post_id = body.post_id;
    newComment.user_id = body.user_id;
    newComment.content = body.content;
    newComment.parent_id = body.parent_id;
    newComment.active = true;

    const hasUserSaved = await this.UsersModel.findOneBy({
      user_id: body.user_id,
    });

    if (!hasUserSaved) {
      if (body.user_name && body.user_image) {
        //salvar usuário
        await this.UsersModel.save({
          user_id: body.user_id,
          user_name: body.user_name,
          user_image: body.user_image,
        });
      } else {
        return {
          error:
            'Usuário com este id não está registrado. Adicione os atributos user_name e user_image para registra-lo.',
        };
      }
    }

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
