import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class CommentsModel {
    @PrimaryGeneratedColumn()
    comment_id: number

    @Column()
    parent_id: number

    @Column('int')
    user_id: number

    @Column('int')
    post_id: number

    @Column({length: 500})
    content: string

    @Column('date')
    created_at: Date

    @Column('int')
    vote_points: number

    @Column('boolean')
    active: boolean
}