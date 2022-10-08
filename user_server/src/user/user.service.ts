import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo';
import {v4 as uuidv4} from 'uuid';
@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo){}

  async signUp(createUserInput: CreateUserDTO) {
    //중복 아이디, 이메일, 닉네임 확인
    let duplicatedId: boolean, duplicatedNickName: boolean, duplicatedEmail: boolean;
    try{
      await this.userRepo.findUserById(createUserInput.id) === null? duplicatedId = false : duplicatedId = true;
      await this.userRepo.findUserByNickName(createUserInput.nickName) === null? duplicatedNickName = false : duplicatedNickName = true;
      await this.userRepo.findUserByEmail(createUserInput.email) === null? duplicatedEmail = false : duplicatedEmail = true;
    }catch(err){

    }
    if(duplicatedId || duplicatedNickName || duplicatedEmail){
      throw new Error();
    }
    //user 정보 설정
    // const user: User = new User();
    // user.id = createUserInput.id;
    // user.pw = createUserInput.pw;
    // user.nickName = createUserInput.nickName;
    // user.email = createUserInput.email;
    // user.role = "normal";
    const user: User = {
      userIdx: 120,
      created : new Date(),
      status : '',
      role : "normal",
      ...createUserInput
    };
    let res:User;
    try{
      res = await this.userRepo.signUp(user); //transaction 유저, 유저토큰 저장 repo에서
    }catch(err){

    }
    if(res === null) throw new Error();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

}
