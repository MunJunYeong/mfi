import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class UserListObj{
    @Field()
    @IsNotEmpty()
    userList: User[]

    @Field()
    @IsNotEmpty()
    count: number


}