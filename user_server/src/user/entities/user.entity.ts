import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserToken } from 'src/user-token/entities/user-token.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
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

  @Field(type => UserToken)
  userToken: UserToken;
}
