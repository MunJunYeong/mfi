import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserPwDTO{
    @Field()
    @IsNotEmpty()
    email: string

    @Field()
    @IsNotEmpty()
    pw: string
    
}