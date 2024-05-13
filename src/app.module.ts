import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './modules/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsService } from './modules/comments/comments.service';

const databaseConfig: TypeOrmModule = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'db3',
  type: 'postgres',
  entities: ['dist/**/*.model.js', 'src/**/*.model.js'],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot(),
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
