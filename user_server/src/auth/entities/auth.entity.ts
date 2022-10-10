import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Auth {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  userIdx: number

  @Field(() => String)
  @Column()
  email: string

  @Field(() => String)
  @Column()
  no: string

}


