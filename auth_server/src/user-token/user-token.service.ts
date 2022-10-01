import { Injectable } from '@nestjs/common';
import { CreateUserTokenInput } from './dto/create-user-token.input';
import { UpdateUserTokenInput } from './dto/update-user-token.input';

@Injectable()
export class UserTokenService {
  create(createUserTokenInput: CreateUserTokenInput) {
    return 'This action adds a new userToken';
  }

  findAll() {
    return `This action returns all userToken`;
  }

  findOne(id: number) {
    return {
      userIdx: id,
      token: 'asdsadfsd'
    }
    return `This action returns a #${id} userToken`;
  }

  update(id: number, updateUserTokenInput: UpdateUserTokenInput) {
    return `This action updates a #${id} userToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} userToken`;
  }
}
