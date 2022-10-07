import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';

@Injectable()
export class UserService {
  signUp(createUserInput: CreateUserInput) {
    console.log(createUserInput);
    return 'This action adds a new user';
  }

  forceLogout(token: Number) {
    throw new Error('Method not implemented.');
  }
  getUserToken(userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  getUserData(userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  updateUserToken(token: String, userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  updateRole(role: String, userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  logout(userIdx: Number) {
    throw new Error('Method not implemented.');
  }
  forceSignIn(id: String, pw: String) {
    throw new Error('Method not implemented.');
  }
  signIn(id: String, pw: String) {
    throw new Error('Method not implemented.');
  }
  updatePw(email: String, id: String, pw: String) {
    throw new Error('Method not implemented.');
  }
  findPw(email: String, id: String) {
    throw new Error('Method not implemented.');
  }
  findId(email: String) {
    throw new Error('Method not implemented.');
  }
  checkNickName(nickName: String) {
    throw new Error('Method not implemented.');
  }
  checkId(id: String) {
    throw new Error('Method not implemented.');
  }
  checkMail(email: String, no: String) {
    throw new Error('Method not implemented.');
  }
  
  sendMail(email: String) {
    throw new Error('Method not implemented.');
  }

}
