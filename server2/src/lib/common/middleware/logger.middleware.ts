import { Inject, Injectable, LoggerService, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { Logger } from "winston";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@Inject(Logger) private readonly logger: LoggerService){}

    use(req: Request, res: Response, next: NextFunction){
        console.log('middleware request!!!')
        const {ip, method, originalUrl} = req;
        const userAgent = req.get('user-agent');

        // res.on('finish', ()=> {
        //     const {statusCode} = res;
        //     this.logger.log(
        //         `${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`,
        //     );
        // });

        next();
    }
}