import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1715624592962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `
            CREATE TABLE IF NOT EXISTS comments_model (
                comment_id SERIAL PRIMARY KEY,
                parent_id INT,
                user_id INT,
                post_id INT,
                content VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                active BOOLEAN
              );
              
              CREATE TABLE IF NOT EXISTS users_model (
                user_id INT PRIMARY KEY,
                user_name VARCHAR,
                user_image VARCHAR
              );
              
              CREATE TABLE IF NOT EXISTS votes_model (
                vote_id SERIAL PRIMARY KEY,
                user_id INT,
                is_upvote BOOLEAN,
                comment_id INT,
                FOREIGN KEY (user_id) REFERENCES users_model(user_id),
                FOREIGN KEY (comment_id) REFERENCES comments_model(comment_id)
              );
              
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    DROP TABLE IF EXISTS votes_model;
    DROP TABLE IF EXISTS users_model;
    DROP TABLE IF EXISTS comments_model;`);
  }
}
