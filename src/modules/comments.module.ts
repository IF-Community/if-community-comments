import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModel } from '../models/comments.model';
import { CommentsController } from 'src/controllers/comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsModel])],
  controllers: [CommentsController],
  providers: [],
})
export class CommentModule {}
