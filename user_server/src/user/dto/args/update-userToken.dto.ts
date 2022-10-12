import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserTokenDTO{
    @Field()
    @IsNotEmpty()
    userIdx: number

    @Field()
    @IsNotEmpty()
    token: string
    
}