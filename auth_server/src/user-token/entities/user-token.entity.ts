import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
export class UserToken {
  @Field(() => Number)
  @Column()
  userIdx: Number

  @Field(() => String)
  @Column()
  token: String
}
