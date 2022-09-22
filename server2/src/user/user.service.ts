import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo'

// Nest IoC 컨테이너에서 관리할 수 있는 클래스임을 선언
@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}
  
  async createUser(createUserDto: CreateUserDto) {
    const {id, pw, name} = createUserDto;
    
    // value validation
    if(!id || !pw || !name){
      throw new HttpException({
        error : 'wrong data',

      }, HttpStatus.BAD_REQUEST);
    }

    let newUser = new User();
    newUser.id = id;
    newUser.pw = pw;
    newUser.name = name;

    let result: object;
    try{
      result = await this.userRepo.save(newUser);
    }catch(err){
      //db error 는 http 에러가 아니니깐 그 에러 해당 객체로 보내고 컨트롤러에서 http 에러로 던져ㅜ더=던가 매핑을 다시 하는 과정이 필요
      throw new HttpException({
        error : 'db error'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      
    }
    return result;
  }

  async findAllUserList() {
    let result: User[];
    try{
      result = await this.userRepo.find();
    }catch(err){
      throw new HttpException({
        error : 'db error'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  async findOneUser(userIdx: number) {
    let result: User = new User();
    try {
      result = await  this.userRepo.findOne({
        where : {userIdx : userIdx}
      });
    }catch(err){
      throw new HttpException({
        error : 'db error'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if(result === null){
      throw new HttpException({
        error : 'not found'
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateName(userIdx: number, updateUserDto: UpdateUserDto) {
    const id: string = updateUserDto.id;
    try{
      await this.userRepo.update(userIdx, {id});
    }catch(err){
      throw new HttpException({
        error : 'db error'
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    // entity Column과 일치해야지 update 가능.
    return `This action updates a #${userIdx} user`;
  }

  async removeUser(userIdx: number) {
    await this.userRepo.delete(userIdx);
    return `This action removes a #${userIdx} user`;
  }
}
