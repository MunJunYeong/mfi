import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt';


// //Guards 는 모든 middleware의 다음에 실행되고, interceptor 나 pipe 이전에 실행된다.

// 관리자만 가능
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ){}
    async canActivate(context: ExecutionContext) {
        console.log('dfafasfsd')
        const req = getHttpReq(context);
        const token: string = req.headers.authorization;
        if(!token) throw new Error('wrong access'); 

        let decodedToken: any;
        try{
            decodedToken = await this.jwtService.verifyAsync(token);
        }catch(err){
            if(err.message === 'jwt expired') {
                throw new Error('accessToken expired');
            }
            // jwt malformed || invalid token
            throw new Error('wrong token');
        }
        if(decodedToken.role !== 'admin') throw new Error('not admin');
        req['user'] = decodedToken;
        return true;
    }
}

// 로그인 되어져있는 사용자면 ok
/*
graphql 안에서만 사용되는 검증 Role Guard
**/
@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ){}
    async canActivate(context: ExecutionContext) {
        // const ctx = GqlExecutionContext.create(context);
        // let token:string = ctx.getArgs()['token'];
        let req = getHttpReq(context);
        const token: string = req.headers.authorization;
        if(!token) throw new Error('wrong access');
        let decodedToken: any;
        try{
            decodedToken = await this.jwtService.verifyAsync(token);
        }catch(err){
            if(err.message === 'jwt expired') {
                throw new Error('accessToken expired');
            }
            // jwt malformed || invalid token
            throw new Error('wrong token');
        }
        req.user = {};
        req.user = decodedToken;
        return true;
    }
}

const getHttpReq = (context: ExecutionContext)=> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
}