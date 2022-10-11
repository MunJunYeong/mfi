import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/input/create-user.dto';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repo';
// import {v4 as uuidv4} from 'uuid';
import { MailService } from '../mail/mail.service';
import { Auth } from 'src/auth/entities/auth.entity';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { UpdatePwDTO } from './dto/args/update-user.pw';
@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo, private readonly mailService: MailService){}
  


  
  async updatePw(updatePwDTO: UpdatePwDTO) {
    let user:User = new User();
    try{
      // 트랜잭션의 고립성을 보장하기 위해 ()=> 를 사용
      user = await this.userRepo.findUserByEmail(updatePwDTO.email);
      user.pw = updatePwDTO.pw;
      user = await this.userRepo.save(user);
    }catch(err){
      console.log(err);
    }
    return user;
  }
  async checkAuth(authDTO: AuthDTO) {
    // 1. authentication에 와있는 인증번호를 확인한다.
    let auth: Auth[] = [];
    try{
      auth = await this.userRepo.findAuth(authDTO.email);
    }catch(err){

    }
    if(auth[auth.length-1].no !== authDTO.no){
      throw new Error('잘못된 인증번호!!!!!');
    }
    try{
      await this.userRepo.deleteAuthByEmail(authDTO.email);
    }catch(err){
      
    }
    let user: User = new User();
    user.email = authDTO.email;
    return user;
  }

  // 일치하는 email 확인 후 -> id mail 전송.
  async sendIdMail(email: string) {
    let user:User = new User();
    try{
      user = await this.validateMail(email, true);
    }catch(err){
      
    }
    if(user === null){
      throw new Error('잘못된 email');
    }
    const tempId: string = user.id.substring(0, user.id.length-3);
    this.mailService.idMail( (tempId+'***') , email);
    return user;
  }
  // 일치하는 email 확인 후 -> 인증번호 전송
  async sendPwMail(email: string) {
    let user:User = new User();
    try{
      user = await this.validateMail(email, true);
    }catch(err){
      
    }
    if(user === null){
      throw new Error('잘못된 email');
    }
    try{
      const no: string = this.mailService.authenticationMail(email);
      let authentication:Auth = new Auth();
      authentication.email = email;
      authentication.no = no;
      await this.userRepo.saveAuth(authentication);
    }catch(err){

    }
    return user;
  }
  // 회원가입시 이메일 중복확인을 위한 mail 전송
  async sendMail(email: string) {
    let user:User = new User();
    try{
      user = await this.validateMail(email, false);
    }catch(err){
      
    }
    if(user !== null){
      throw new Error('잘못된 email');
    }
    
    // 이메일을 보내고 이메일에 해당하는 인증번호 저장
    try{
      const no: string = this.mailService.authenticationMail(email);
      let authentication:Auth = new Auth();
      authentication.email = email;
      authentication.no = no;
      await this.userRepo.saveAuth(authentication);
    }catch(err){

    }
    // 체크해주려면 이렇게 반환해서 . 어떻게 반환해야 오류가 안나는지 모르겠음 아직
    return user;
  }

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
//중복여부 : 중복(있음) true || 없음 false
  async validateMail(email: string, flag: boolean){
    let existEmail: boolean;
    let user:User = new User;
    try{
      user = await this.userRepo.findUserByEmail(email);
    }catch(err){

    }
    // user === null? existEmail = false : existEmail = true;
    // if(flag !== existEmail){
    //   throw new Error('잘못된 email');
    // }
    return user;
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

}
