import { Module } from '@nestjs/common';
import { CommentModule } from './modules/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModule = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'testenest',
  type: 'postgres',
  entities: ["dist/**/*.model.js"],
  synchronize: true,
  logging: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
