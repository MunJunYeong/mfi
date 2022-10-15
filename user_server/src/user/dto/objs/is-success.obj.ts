import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class IsSuccessObj{
    @Field()
    @IsNotEmpty()
    isSuccess: boolean
}