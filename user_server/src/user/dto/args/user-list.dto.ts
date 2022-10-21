import { InputType, Field } from '@nestjs/graphql';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetUserListDTO{
    @Field()
    @IsNotEmpty()
    page: number

    @Field()
    @IsString()
    nickName: string
}