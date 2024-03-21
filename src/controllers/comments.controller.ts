import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentsModel } from "src/models/comments.model";
import { CommentsSchema } from "src/schemas/comments.schema";
import { Repository, WithoutId } from "typeorm";


@Controller('/comments')
export class CommentsController {
    constructor(@InjectRepository(CommentsModel) private model: Repository<CommentsModel>){};

    //CRUD
    @Get()
    async getAll() {
        //Apenas comentários ativos
        const list = await this.model.findBy({ active: true })
        return list;
    }
    
    @Post()
    async postComment(@Body() body: CommentsSchema) {
        const newComment: Omit<CommentsModel, 'comment_id'>  = {
            ...body,
            active: true,
            created_at: new Date(),
            vote_points: 0,
        }

        await this.model.save(newComment)
        return {message: 'Comentário registrado!', comment: newComment};
    }
    @Put(':id')
    async editComment(@Param('id') id: number, @Body() body: CommentsSchema) {
        const editingComment = await this.model.findOneBy({ comment_id: id })
        const editedComment: Omit<CommentsModel, 'comment_id'> = {
            ...editingComment,
            ...body,
        }

        await this.model.update({comment_id: id}, editedComment)

        return {message: 'Comentário editado!', comment: editedComment};
    }

    @Delete(':id')
    async deleteComment(@Param('id') id: number) {
        const comment = await this.model.findOneBy({comment_id: id})
        await this.model.update({comment_id: id}, {...comment, active: false})

        return {message: 'Comentário removido (softdelete)', comment: {...comment, active: false}}
    }

    @Delete('harddelete/:id')
    async hardDeleteComment(@Param('id') id: number) {
        await this.model.delete({comment_id: id})

        return {message: 'Comentário removido (harddelete)'}
    }
}
