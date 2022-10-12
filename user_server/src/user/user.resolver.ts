import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignUpInputDTO } from './dto/input/signUp-input.dto';
import { AuthDTO } from '../auth/dto/auth.dto';
import { UpdatePwDTO } from './dto/args/update-user.pw';
import { LoginInputDTO } from './dto/args/login-input.dto';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async signUp(@Args('input') signUPInputDTO: SignUpInputDTO) {
    return this.userService.signUp(signUPInputDTO.id, signUPInputDTO.pw, signUPInputDTO.email, signUPInputDTO.nickName);
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
    return this.userService.checkAuth(authDTO.email, authDTO.no);
  }
  @Mutation(()=> User)
  async updatePw(@Args('input') updatePwDTO: UpdatePwDTO){
    return this.userService.updatePw(updatePwDTO.email, updatePwDTO.pw);
  }
  @Mutation(()=> User)
  async signIn(@Args('input') loginInputDTO: LoginInputDTO){
    return this.userService.signIn(loginInputDTO.id, loginInputDTO.pw);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

}
