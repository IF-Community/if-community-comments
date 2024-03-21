import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class CommentModel {
    @PrimaryColumn()
    comment_id: number

    @Column('int')
    parent_id: number | null

    @Column('int')
    user_id: number

    @Column('varchar')
    content: string

    @Column('date')
    created_at: Date

    @Column('int')
    vote_points: number

    @Column('boolean')
    active: boolean
}