import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInputDTO{
    @Field()
    @IsNotEmpty()
    id: string

    @Field()
    @IsNotEmpty()
    pw: string
    
}