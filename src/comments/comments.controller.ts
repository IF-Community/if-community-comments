import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

@Controller('/comments')
export class CommentsController {
    @Get()
    getAll(): string {
        return 'This action returns all cats';
    }
    @Post()
    postComment(): string {
        return 'This action returns all cats';
    }
    @Put()
    updateComment(): string {
        return 'This action returns all cats';
    }
    @Delete()
    deleteComment(): string {
        return 'This action returns all cats';
    }
}