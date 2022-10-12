import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserRoleDTO{
    @Field()
    @IsNotEmpty()
    userIdx: number

    @Field()
    @IsNotEmpty()
    role: string
    
}