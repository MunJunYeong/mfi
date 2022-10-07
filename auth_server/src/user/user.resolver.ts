import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { UserTokenService } from '../user-token/user-token.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, readonly userTokenService: UserTokenService) {}

  //회원가입 api
  @Mutation(() => User)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.signUp(createUserInput);
  }
  @Mutation(()=> Boolean)
  sendMail(@Args('email') email: String){
    return this.userService.sendMail(email);    
  }
  @Mutation(()=> Boolean)
  checkMail(@Args('email') email: String, @Args('no') no: String){
    return this.userService.checkMail(email, no);    
  }
  // @Mutation(()=> Boolean)
  // checkId(@Args('id') id: String){
  //   return this.userService.checkId(id);    
  // }
  // @Mutation(()=> Boolean)
  // checkNickName(@Args('nickName') nickName: String){
  //   return this.userService.checkNickName(nickName);    
  // }

  // ID, PW api
  @Mutation(()=> Boolean)
  findId(@Args('email') email: String){
    return this.userService.findId(email);    
  }
  @Mutation(()=> Boolean)
  findPw(@Args('email') email: String, @Args('id') id: String){
    return this.userService.findPw(email, id);    
  }
  @Mutation(()=> Boolean)
  updatePw(@Args('email') email: String, @Args('id') id: String, @Args('pw') pw: String){
    return this.userService.updatePw(email, id, pw);    
  }
  //로그인 api
  @Mutation(()=> Boolean)
  signIn(@Args('id') id: String, @Args('pw') pw: String){
    return this.userService.signIn(id, pw);    
  }
  @Mutation(()=> Boolean)
  forceSignIn(@Args('id') id: String, @Args('pw') pw: String){
    return this.userService.forceSignIn(id, pw);    
  }
  //로그아웃 api
  @Mutation(()=> Boolean)
  logout(@Args('userIdx') userIdx: Number){
    return this.userService.logout(userIdx);    
  }
  @Mutation(()=> Boolean)
  forceLogout(@Args('token') token: Number){
    return this.userService.forceLogout(token);    
  }
  //미들웨어가 필요한 부분
  @Query(()=> User, {name : 'user'})
  getUserData(@Args('userIdx', { type: () => Int }) userIdx: Number){
    return this.userService.getUserData(userIdx);
  }
  @Query(()=> User, {name : 'user'})
  getUser(){
    return ;
  }
  @Query(()=> User, {name : 'user'})
  getUserToken(@Args('userIdx', { type: () => Int }) userIdx: Number){
    return this.userService.getUserToken(userIdx);
  }
  @Mutation(()=> Boolean)
  updateRole(@Args('role') role: String, @Args('userIdx') userIdx: Number){
    return this.userService.updateRole(role, userIdx);
  }
  @Mutation(()=> Boolean)
  updateUserToken(@Args('token') token: String, @Args('userIdx') userIdx: Number){
    return this.userService.updateUserToken(token, userIdx);
  }
 //test


  @ResolveField()
  async userToken(@Parent() user: User) {
    const { userIdx } = user;
    return this.userTokenService.findOne(userIdx);
  }
}
