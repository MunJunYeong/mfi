import { CreateUserTokenInput } from './create-user-token.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserTokenInput extends PartialType(CreateUserTokenInput) {
  @Field(() => Int)
  id: number;
}
