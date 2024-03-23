import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from 'src/modules/comments/comments.controller';
import { CommentsModel } from './entities/comments.model';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsModel])],
  controllers: [CommentsController],
  providers: [],
})
export class CommentModule {}
