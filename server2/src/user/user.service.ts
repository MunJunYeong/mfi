import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo'

// Nest IoC 컨테이너에서 관리할 수 있는 클래스임을 선언
@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}
  
  //signup
  async createUser(createUserDto: CreateUserDto) {
    const {id, pw, name} = createUserDto;

    // nest의 NotFoundException 을 통해 손쉽게 에러핸들링 가능
    if(!id || !pw || !name){
      throw new NotFoundException('wrong data');
    }

    let newUser = new User();
    newUser.id = id;
    newUser.pw = pw;
    newUser.name = name;

    return await this.userRepo.save(newUser);
  }

  async findAllUserList() {
    console.log(await this.userRepo.findAllUserList11());
    // return await this.userRepo.find();
  }

  async findOneUser(userIdx: number) {
    const userData = await  this.userRepo.findOne({
      where : {userIdx : userIdx}
    });
    return userData;
  }

  async updateName(userIdx: number, updateUserDto: UpdateUserDto) {
    const id: string = updateUserDto.id;
    await this.userRepo.update(userIdx, {id});
    // entity Column과 일치해야지 update 가능.
    return `This action updates a #${userIdx} user`;
  }

  async removeUser(userIdx: number) {
    await this.userRepo.delete(userIdx);
    return `This action removes a #${userIdx} user`;
  }
}
