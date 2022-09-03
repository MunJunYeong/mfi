import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { UserEntity } from './entities/user.entity';
import { UserRepo } from './user.repo'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  
  //signup
  async create(createUserDto: CreateUserDto) {
    const {id, pw, name} = createUserDto;
    let newUser = new UserEntity();
    newUser.id = id;
    newUser.pw = pw;
    newUser.name = name;

    return await this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.create();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
