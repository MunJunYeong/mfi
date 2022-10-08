import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Authentication {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx: number

  @Field(() => String)
  @Column()
  id: string

  @Field(() => String)
  @Column()
  no: string

}
