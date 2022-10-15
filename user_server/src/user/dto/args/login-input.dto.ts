import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInputDTO{
    @Field()
    @IsNotEmpty()
    id: string

    @Field()
    @IsNotEmpty()
    pw: string

    @Field()
    @IsNotEmpty()
    isForce: boolean
}