import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: String;
  pw: String;
  nickName: String;
  email: String
  role: String
}
