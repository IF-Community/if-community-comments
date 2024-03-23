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
import { Repository, WithoutId } from 'typeorm';
import {
  CreateCommentDTO,
  EditCommentDTO,
} from './dto/createAndEditComment.dto';
import { CommentsModel } from './entities/comments.model';
import { VoteCommentDTO } from './dto/voteComment.dto';
import { ApiKeyGuard } from 'src/app.service';

@UseGuards(ApiKeyGuard)
@Controller('/comments')
export class CommentsController {
  constructor(
    @InjectRepository(CommentsModel) private model: Repository<CommentsModel>,
  ) {}

  //CRUD
  @Get()
  async getAll() {
    //Apenas comentários ativos
    const list = await this.model.findBy({ active: true });
    return list;
  }

  @Post()
  async postComment(@Body() body: CreateCommentDTO) {
    const newComment: Omit<CommentsModel, 'comment_id'> = {
      ...body,
      active: true,
      created_at: new Date(),
      user_upvotes: [],
      user_downvotes: [],
    };

    await this.model.save(newComment);
    return { message: 'Comentário registrado!', comment: newComment };
  }
  @Put(':id')
  async editComment(@Param('id') id: number, @Body() body: EditCommentDTO) {
    const editingComment = await this.model.findOneBy({ comment_id: id });
    const editedComment: Omit<CommentsModel, 'comment_id'> = {
      ...editingComment,
      ...body,
    };

    await this.model.update({ comment_id: id }, editedComment);

    return { message: 'Comentário editado!', comment: editedComment };
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    const comment = await this.model.findOneBy({ comment_id: id });
    await this.model.update({ comment_id: id }, { ...comment, active: false });

    return {
      message: 'Comentário removido (softdelete)',
      comment: { ...comment, active: false },
    };
  }

  @Delete('harddelete/:id')
  async hardDeleteComment(@Param('id') id: number) {
    await this.model.delete({ comment_id: id });

    return { message: 'Comentário removido (harddelete)' };
  }

  //Votes
  async handleVote(
    body: VoteCommentDTO,
    id: number,
    reactionType: 'add' | 'remove',
  ) {
    const voteComment = await this.model.findOneBy({ comment_id: id });
    let aready_voted = false;

    console.log(voteComment);

    //Verificar se usuário já votou
    if (
      voteComment.user_upvotes.find((vote) => vote == body.reaction_by_user) ||
      voteComment.user_downvotes.find((vote) => vote == body.reaction_by_user)
    ) {
      //Remoção de voto
      const result: typeof voteComment = {
        ...voteComment,
        user_upvotes: voteComment.user_upvotes.filter(
          (vote) => vote != body.reaction_by_user,
        ),
        user_downvotes: voteComment.user_downvotes.filter(
          (vote) => vote != body.reaction_by_user,
        ),
      };

      await this.model.update({ comment_id: id }, result);

      return { message: 'Voto Removido', comment: result };
    }

    //Adicionar voto
    if (reactionType == 'add') {
      voteComment.user_upvotes.push(body.reaction_by_user);
    } else {
      voteComment.user_downvotes.push(body.reaction_by_user);
    }

    await this.model.update({ comment_id: id }, { ...voteComment });
    return {
      message: `Voto adicionado com sucesso!`,
      comment: voteComment,
    };
  }

  @Patch('add-upvote/:id')
  async addUpVote(@Param('id') id: number, @Body() body: VoteCommentDTO) {
    return this.handleVote(body, id, 'add');
  }

  @Patch('add-downvote/:id')
  async addDownVote(@Param('id') id: number, @Body() body: VoteCommentDTO) {
    return this.handleVote(body, id, 'remove');
  }
}
