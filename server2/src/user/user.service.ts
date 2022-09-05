import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo'

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

  findAllUserList() {
    return this.userRepo.find();
  }

  findOneUser(id: number) {
    return this.userRepo.findOne({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
