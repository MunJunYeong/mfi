import { Resolver } from '@nestjs/graphql';
import { UserTokenService } from './user-token.service';

@Resolver()
export class UserTokenResolver {
  constructor(private readonly userTokenService: UserTokenService) {}
}
