import { Injectable } from '@nestjs/common';
import { UserToken } from 'src/user-token/entities/user-token.entity';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo';

import jwtUtils from '../lib/common/jwtUtils';


@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  
  //회원가입 api
  async signUp(createUserInput: CreateUserInput) {
    //중복 아이디, 이메일, 닉네임 확인
    let duplicatedId: Boolean, duplicatedNickName: Boolean, duplicatedEmail: Boolean;
    try{
      await this.userRepo.findUserById(createUserInput.id) === null? duplicatedId = false : duplicatedId = true;
      await this.userRepo.findUserByNickName(createUserInput.nickName) === null? duplicatedNickName = false : duplicatedNickName = true;
      await this.userRepo.findUserByEmail(createUserInput.email) === null? duplicatedEmail = false : duplicatedEmail = true;
    }catch(err){

    }

    if(duplicatedId || duplicatedNickName || duplicatedEmail){
      throw new Error();
    }
    
    try{
      await this.userRepo.signUp(createUserInput); //transaction 유저, 유저토큰 저장 repo에서
    }catch(err){

    }
    return 'This action adds a new user';
  }
  sendMail(email: String) {
    throw new Error('Method not implemented.');
  }
  checkMail(email: String, no: String) {
    throw new Error('Method not implemented.');
  }
  // async checkId(id: String): Promise<Boolean> {
  //   let isDuplicated: Boolean;
  //   try{
  //     await this.userRepo.findUserById(id) === null? isDuplicated = false : isDuplicated = true;
  //   }catch(err){

  //   }
  //   return isDuplicated;
  // }
  // checkNickName(nickName: String): Promise<Boolean> {
  //   let isDuplicated: Boolean;
  //   try{
  //     await this.userRepo.findUserById(id) === null? isDuplicated = false : isDuplicated = true;
  //   }catch(err){

  //   }
  //   return isDuplicated;
  // }

  // ID, PW api
  findId(email: String) {
    throw new Error('Method not implemented.');
  }
  findPw(email: String, id: String) {
    throw new Error('Method not implemented.');
  }
  updatePw(email: String, id: String, pw: String) {
    throw new Error('Method not implemented.');
  }

  //로그인 
  async signIn(id: String, pw: String) {
    let user:User;
    try{
      user = await this.userRepo.findUserById(id);
    }catch(err){

    }
    if(user === null) throw new Error(); // wrong id
    if(user.pw !== pw) throw new Error(); //wrong pw
    let isLogin: Boolean = false;
    try{
      const haveToken:UserToken = await this.userRepo.haveUserToken(user.userIdx);
      haveToken.token === '' ? isLogin = false : isLogin = true;
    }catch(err){

    }
    if(isLogin) throw new Error();
    // return을 try 밖에서 하는 것이 맞?
    try{
      user.pw = '';
      const accessToken: String = jwtUtils.sign(user);
      const refreshToken: String = jwtUtils.sign();
      await this.userRepo.saveUserToken(user.userIdx, accessToken);
      return {token : accessToken, refreshToken : refreshToken};
    }catch(err){

    }
    


    throw new Error('Method not implemented.');
  }
  forceSignIn(id: String, pw: String) {
    throw new Error('Method not implemented.');
  }
  
  //로그아웃
  logout(userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  forceLogout(token: Number) {
    throw new Error('Method not implemented.');
  }


  //middleware 필요
  getUserData(userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  getUserToken(userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  updateUserToken(token: String, userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  updateRole(role: String, userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  
  
}
