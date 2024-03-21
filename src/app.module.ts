import { Module } from '@nestjs/common';
import { CommentModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModel } from './comments/comments.model';


const databaseConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  entities: [CommentModel],
  database: 'testenest',
  synchronize: true,
  logging: true,
}

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
