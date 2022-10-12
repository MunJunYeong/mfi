import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserTokenDTO{
    @Field()
    @IsNotEmpty()
    token: string

    @Field()
    @IsNotEmpty()
    refreshToken: string
    
}