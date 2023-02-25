import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: "bigint",
        name: "id"
    })
    id: number

    @Column({
        name: "email",
        nullable: false,
        default: ''
    })
    email: string
    @Column({
        name: "password",
        nullable: false
    })
    password: string

    @Column({
        name: "name",
        nullable: false,
        default: ''
    })
    name: string

    @Column({
        type: "datetime",
        name: "created_at",
        nullable: false
    })
    created_at: Date

    @Column({
        type: "datetime",
        name: "updated_at",
        nullable: true,
    })
    updated_at: Date

    @Column({
        type: "enum",
        name: "level",
        nullable: false,
        enumName: "user_level",
        enum: ["customer", "admin"]
    })
    level: string
}