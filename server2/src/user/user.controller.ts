import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// `constructor`를 사용하여 `UserService` 클래스를 가져와 사용한다.
// controller에 service를 주입하기 위해서는 user.module.ts에 controller와 service가 정의되어야 한다.


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAllUserList();
  }

  @Get(':userIdx')
  findOne(@Param('userIdx') id: string) {
    return this.userService.findOneUser(+id);
  }

  @Patch(':userIdx')
  updateName(@Param('userIdx') userIdx: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateName(userIdx, updateUserDto);
  }

  @Delete(':userIdx')
  remove(@Param('userIdx') userIdx: number) {
    return this.userService.removeUser(userIdx);
  }
}
