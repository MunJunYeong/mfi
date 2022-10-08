import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  userIdx: number

  @Field(() => String)
  @Column()
  id: string

  @Field(() => String)
  @Column()
  pw: string

  @Field(() => String)
  @Column()
  nickName: string

  @Field(() => String)
  @Column()
  email: string

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created: Date

  @Field(() => String, { nullable: true })
  @Column()
  status: string

  @Field(() => String)
  @Column()
  role: string

  // @Field(type => UserToken)
  // userToken: UserToken;
}
