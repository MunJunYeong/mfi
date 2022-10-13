import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class GetUserListDTO{
    @Field()
    @IsNotEmpty()
    page: number

    @Field()
    nickName: string
    
}