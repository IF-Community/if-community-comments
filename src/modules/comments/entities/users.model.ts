import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UsersModel {
  @PrimaryColumn()
  user_id: number;

  @Column()
  user_name: string;

  @Column()
  user_image: string;
}
