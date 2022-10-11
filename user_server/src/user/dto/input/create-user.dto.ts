import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';


// isNotEmpty와 같은 추가적인 데코레이터가 추가되어야지 정상 작동

@InputType()
export class CreateUserDTO {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  pw: string;

  @Field()
  @IsNotEmpty()
  nickName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

}
