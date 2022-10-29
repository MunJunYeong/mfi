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
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = getHttpReq(context);
        if(!req.headers.authorization) throw new Error('wrong access'); 

        const decodedToken = this.jwtService.verify(req.headers.authorization);
        if(decodedToken.role !== 'admin') throw new Error('not admin');
        req['user'] = decodedToken;
        return true;
    }
}

// 로그인 되어져있는 사용자면 ok
@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ){}
    async canActivate(context: ExecutionContext) {
        const req = getHttpReq(context);
        if(!req.headers.authorization) throw new Error('wrong access');
        let decodedToken: any;
        try{
            decodedToken = await this.jwtService.verifyAsync(req.headers.authorization);
        }catch(err){
            console.log(err);
            throw new Error('');
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