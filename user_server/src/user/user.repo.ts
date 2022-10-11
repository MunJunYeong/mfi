import { CustomRepository } from "../lib/db/typeorm-ex.decorator";
import { UserToken } from "../user-token/entities/user-token.entity";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Auth } from "../auth/entities/auth.entity";


@CustomRepository(User)
export class UserRepo extends Repository<User>{


    async deleteAuthByEmail(email: string) {
        try{
            await this.manager.delete(Auth, {email : email})
        }catch(err){
            console.log(err)
        }
    }

    async findAuth(email: string): Promise<Auth[]> {
        let auth: Auth[] = [];
        //여러 번 메일이 갔을 수도 있으니깐 해당 메일에서 가장 마지막
        try{
            auth = await this.manager.find(Auth, {
                where : {
                    email : email
                }
            });
        }catch(err){

        }
        return auth;

    }

    async saveAuth(authentication: Auth) {
        try{
         await this.manager.save(Auth, authentication);   
        }catch(err){
            console.log(err);
        }
    }
    
    async signUp(user: User){
        let createUser: User = null;
        try{
            createUser = await this.manager.transaction(async (t)=> {
                const tempUser: User = await t.save(User, user);
                if(!tempUser) throw Error(); 
                const inputToken: UserToken = {
                    userIdx : tempUser.userIdx,
                    token : ''
                };
                const createToken = await t.save(UserToken, inputToken);
                if(!createToken) throw Error();
                return tempUser;
            })
        }catch(err){

        }
        return createUser;
    }


    async findUserById(id: string){
        try{
            return await this.manager.findOne(User, {
                where : {id : id}
            })
        }catch(err){

        }
    }
    async findUserByNickName(nickName: string){
        try{
            return await this.manager.findOne(User, {
                where : {nickName : nickName}
            })
        }catch(err){
            
        }
    }
    async findUserByEmail(email: string){
        try{
            return await this.manager.findOne(User, {
                where : {email : email}
            })
        }catch(err){
            
        }
    }



}