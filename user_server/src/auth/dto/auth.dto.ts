import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AuthDTO {

  @Field()
  @IsNotEmpty()
  email: string

  @Field()
  @IsNotEmpty()
  no: string;
}
