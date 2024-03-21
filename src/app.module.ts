import { Module } from '@nestjs/common';
import { CommentModule } from './comments/comments.module';


@Module({
  imports: [CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
