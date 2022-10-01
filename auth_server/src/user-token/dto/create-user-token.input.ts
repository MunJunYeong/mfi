import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserTokenInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
