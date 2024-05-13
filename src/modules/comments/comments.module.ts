import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from 'src/modules/comments/comments.controller';
import { CommentsModel } from './entities/comments.model';
import { VotesModel } from './entities/votes.model';
import { UsersModel } from './entities/users.model';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsModel, VotesModel, UsersModel])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentModule {}
