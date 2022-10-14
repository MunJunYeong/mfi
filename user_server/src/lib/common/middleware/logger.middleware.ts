import { Inject, Injectable, Logger, LoggerService, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { JwtService } from "../jwt";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // constructor(@Inject(Logger) private readonly logger: LoggerService) {}
    constructor(
        private readonly jwtService: JwtService,
        // private readonly userService: UserService
    ){}
        //service를 통해서 repo를 할지. 아니면 바로 repo로 접근할지 ?
    async use(req: Request, res: Response, next: NextFunction){
        console.log('middleware request!!!')
        if('x-jwt' in req.headers){
            const token = req.headers['x-jwt'];
            const decodedToken = await this.jwtService.verifyAsync(token.toString());
            if(typeof decodedToken === 'object' && decodedToken.hasOwnProperty('userIdx')){
                try{
                    const user: User = {
                        ...decodedToken
                    }
                    req['user'] = user
                }catch(err){

                }
            }
            next();
        }
        console.log('ddd')
        // const {ip, method, originalUrl} = req;
        // const userAgent = req.get('user-agent') || '';

        // res.on('finish', ()=> {
        //     const {statusCode} = res;
        //     Logger.log(
        //         `${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`,
        //     );
        // });

    }
}