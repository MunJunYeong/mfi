import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  signUp(@Args('input') createUserInput: CreateUserDTO) {
    return this.userService.signUp(createUserInput);
    // 어쩔 때는 userToken이 생성 안되는 경우가 생김 
  }

  @Mutation(()=> User)
  sendMail(@Args('email') email: string){
    return this.userService.sendMail(email);
  }
  @Mutation(()=> User)
  sendIdMail(@Args('email') email: string){
    return this.userService.sendIdMail(email);
  }
  


  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

}
