import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor() {}

  @Query('users')
  async getUsers() {
    console.log(111111);
    return [
        {
            name: '김태형',
            product: {
                proId: 1,
            },
        },
        {
            name: '김태형',
            product: {
                proId: 1,
            }
        }
    ];
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<{name: string}> {
    return {
        name: '문준영'
    };
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: { name: string }): Promise<{name: string}> {
    return {
        name: '이이이'
    };
  }

}