import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('authentication')
export class Auth {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx: number

  @Field(() => String)
  @Column()
  email: string

  @Field(() => String)
  @Column()
  no: string

}


