import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthDTO } from '../auth/dto/auth.dto';
import { SignUpUserDTO } from './dto/args/signUp-user.dto';
import { UpdateUserPwDTO } from './dto/args/update-userPw.dto';
import { LoginInputDTO } from './dto/args/login-input.dto';
import { UserToken } from 'src/user-token/entities/user-token.entity';
import { UpdateUserRoleDTO } from './dto/args/update-userRole.dto';
import { UpdateUserTokenDTO } from './dto/args/update-userToken.dto';
import { GetUserListDTO } from './dto/args/user-list.dto';
import { IsSuccessObj } from './dto/objs/is-success.obj';
import { LoginTokenObj } from './dto/objs/login-token.obj';
import { UseGuards } from '@nestjs/common';
import { AdminGuard, UserGuard } from 'src/lib/common/guard/role.guard';
import { UserListObj } from './dto/objs/user-list.obj';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async signUp(@Args('input') signUPInputDTO: SignUpUserDTO) {
    return this.userService.signUp(signUPInputDTO.id, signUPInputDTO.pw, signUPInputDTO.email, signUPInputDTO.nickName);
    // 어쩔 때는 userToken이 생성 안되는 경우가 생김 
  }
  @Mutation(()=> IsSuccessObj)
  async checkId(@Args('id') id: string){
    return await this.userService.checkId(id);
  }
  @Mutation(()=> IsSuccessObj)
  async checkNickName(@Args('nickName') nickName: string){
    return await this.userService.checkNickName(nickName);
  }
  @Mutation(()=> IsSuccessObj)
  async checkEmail(@Args('email') email: string){
    return await this.userService.checkEmail(email);
  }
  @Mutation(()=> IsSuccessObj)
  async sendMail(@Args('email') email: string){
    return await this.userService.sendMail(email);
  }
  @Mutation(()=> IsSuccessObj)
  async sendPwMail(@Args('email') email: string, @Args('id') id: string,){
    return await this.userService.sendPwMail(email, id);
  }
  @Mutation(()=> IsSuccessObj)
  async sendIdMail(@Args('email') email: string){
    return await this.userService.sendIdMail(email);
  }
  @Mutation(()=> IsSuccessObj)
  async checkAuth(@Args('input') authDTO: AuthDTO ){
    return this.userService.checkAuth(authDTO.email, authDTO.no);
  }
  @Mutation(()=> User)
  async updatePw(@Args('input') updateUserPwDTO: UpdateUserPwDTO){
    return await this.userService.updatePw(updateUserPwDTO.email, updateUserPwDTO.pw);
  }
  //기존 signIn과 달라진 점 : force여부를 flag로 두어서 중복되는 코드를 없앰
  @Mutation(()=> LoginTokenObj)
  async signIn(@Args('input') loginInputDTO: LoginInputDTO){
    // 주소 참조를 안하기 위해서 새로 오브젝트로 만들어서 새로운 주소로 만들기 위함
    return await this.userService.signIn({ id:loginInputDTO.id, pw: loginInputDTO.pw, isForce: loginInputDTO.isForce });
  }
  @Mutation(()=> UserToken)
  async logout(@Args('userIdx') userIdx: number){
    return await this.userService.logout(userIdx);
  }
  @Mutation(()=> User)
  @UseGuards(AdminGuard)
  async updateUserRole(@Args('input') updateUserRoleDTO : UpdateUserRoleDTO){
    let user: User;
    try{
      user = await this.userService.updateUserRole(updateUserRoleDTO.userIdx, updateUserRoleDTO.role);
    }catch(err){
      console.log(err);
    }
    return user;
  }
  @Mutation(()=> UserToken)
  async updateUserToken(@Args('input') updateUserTokenDTO : UpdateUserTokenDTO){
    return await this.userService.updateUserToken(updateUserTokenDTO.userIdx, updateUserTokenDTO.token);
  }
  @Mutation(()=> UserToken)
  async issueAccessToken(@Args('refreshToken') refreshToken : string){
    let userToken: UserToken;
    try{
      userToken = await this.userService.issueAccessToken(refreshToken);
    }catch(err){
      console.log(err);
    }
    return userToken;
  }

  @Query(()=> User, {name: 'getUserData'})
  @UseGuards(UserGuard)
  async getUserData(@Args('token', { type: () => String }) token: string){
    let res: User;
    try{
      res = await this.userService.getUserData(token); 
    }catch(err){
      throw new Error(err.message);
    }
    return res;
  }
  @Query(()=> UserListObj, {name : 'getUserList'})
  @UseGuards(AdminGuard)
  async getUserList(@Args('input', {type: ()=> GetUserListDTO }) getUserListDTO: GetUserListDTO){
    let res: UserListObj;
    try{
      res = await this.userService.getUserList(getUserListDTO.page, getUserListDTO.nickName);
    }catch(err){

    }
    return res;
  }

  @Query(()=> IsSuccessObj, {name : 'validateToken'})
  async validateToken(@Args('token') token: string  ){
    let res: IsSuccessObj;
    try{
      res = await this.userService.validateToken(token);
    }catch(err){
      // invalid token, expired token
      throw new Error(err.message);
    }
    return res;
  }


  

  @ResolveField()
  async userToken(@Parent() user: User) {
    const { userIdx } = user;
    return {
      userIdx: 1,
      token: 'adsfsdf'
    }
  }

}
