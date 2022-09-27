import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo){}

  
  getAllUser(){
    
  }

  findId(email: String) {
    return email;
  }
}
