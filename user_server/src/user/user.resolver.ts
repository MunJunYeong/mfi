import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/input/create-user.dto';
import { AuthDTO } from '../auth/dto/auth.dto';
import { UpdatePwDTO } from './dto/args/update-user.pw';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async signUp(@Args('input') createUserDTO: CreateUserDTO) {
    return this.userService.signUp(createUserDTO);
    // 어쩔 때는 userToken이 생성 안되는 경우가 생김 
  }

  @Mutation(()=> User)
  async sendMail(@Args('email') email: string){
    return await this.userService.sendMail(email);
  }
  @Mutation(()=> User)
  async sendIdMail(@Args('email') email: string){
    return await this.userService.sendIdMail(email);
  }
  @Mutation(()=> User)
  async sendPwMail(@Args('email') email: string){
    return await this.userService.sendPwMail(email);
  }
  
  @Mutation(()=> User)
  async checkAuth(@Args('input') authDTO: AuthDTO ){
    return this.userService.checkAuth(authDTO);
  }

  @Mutation(()=> User)
  async updatePw(@Args('input') updatePwDTO: UpdatePwDTO){
    return this.userService.updatePw(updatePwDTO);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

}
