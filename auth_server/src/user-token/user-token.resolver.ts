import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserTokenService } from './user-token.service';
import { UserToken } from './entities/user-token.entity';

@Resolver(() => UserToken)
export class UserTokenResolver {
  constructor(private readonly userTokenService: UserTokenService) {}
}
