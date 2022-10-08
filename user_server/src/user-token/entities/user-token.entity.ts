import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity("userToken")
export class UserToken {
  
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  userIdx: number

  @Field(() => String)
  @Column()
  token: string
}
