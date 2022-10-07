import { CustomRepository } from "src/lib/db/typeorm-ex.decorator";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/input/create-user.input";
import { UserToken } from "../user-token/entities/user-token.entity";

@CustomRepository(User)
export class UserRepo extends Repository<User>{
    async saveUserToken(userIdx: number, accessToken: String) {
        let userToken: UserToken;
        userToken.userIdx = userIdx;
        userToken.token = accessToken;
        try{
            return await this.manager.save(UserToken, userToken)
        }catch(err){

        }
    }


    async haveUserToken(userIdx: number) {
        try{
            return await this.manager.findOne(UserToken, {
                where : {userIdx : userIdx}
            })
        }catch(err){

        }
    }

    async findUserById(id: String){
        try{
            return await this.manager.findOne(User, {
                where : {id : id}
            })
        }catch(err){

        }
    }
    async findUserByNickName(nickName: String){
        try{
            return await this.manager.findOne(User, {
                where : {nickName : nickName}
            })
        }catch(err){
            
        }
    }
    async findUserByEmail(email: String){
        try{
            return await this.manager.findOne(User, {
                where : {email : email}
            })
        }catch(err){
            
        }
    }

    async signUp(createUserInput: CreateUserInput){
        let user: User = new User();
        user.id = createUserInput.id;
        user.pw = createUserInput.pw;
        user.nickName = createUserInput.nickName;
        user.email = createUserInput.email;
        user.role = createUserInput.role;
        try{
            this.manager.transaction(async (t)=> {
                const createUser = await t.save(User, user);
                const createToken = await t.save(UserToken, );
            })
        }catch(err){

        }
    }

}