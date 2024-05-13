import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from 'src/modules/comments/comments.controller';
import { CommentsModel } from './entities/comments.model';
import { VotesModel } from './entities/votes.model';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsModel, VotesModel])],
  controllers: [CommentsController],
  providers: [],
})
export class CommentModule {}
