import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from 'src/modules/comments/comments.controller';
import { CommentsModel } from './entities/comments.model';
import { VotesModel } from './entities/votes.model';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsModel, VotesModel])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentModule {}
