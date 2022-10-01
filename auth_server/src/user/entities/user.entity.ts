import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UserToken } from "src/user-token/entities/user-token.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType() //graphql의 decorator
@Entity()
export class User {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    userIdx: number

    @Field(() => String)
    @Column()
    id: String

    @Field(() => String)
    @Column()
    pw: String

    @Field(() => String)
    @Column()
    nickName: String

    @Field(() => String)
    @Column()
    email: String

    @Field(() => Date)
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date

    @Field(() => String, { nullable: true })
    @Column()
    status: String

    @Field(() => String)
    @Column()
    role: String

    @Field(type => UserToken)
    userToken: UserToken;


}
