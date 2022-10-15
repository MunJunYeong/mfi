import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class LoginTokenObj{
    @Field()
    @IsNotEmpty()
    token: string

    @Field()
    @IsNotEmpty()
    refreshToken: string
}