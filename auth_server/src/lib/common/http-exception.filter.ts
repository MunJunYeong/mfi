import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';


//http통신의 예외를 캐치한다.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.getResponse();

        console.log('요청 url : ' + req.url);
        console.log(JSON.stringify(message));

        res
        .status(status)
        .json({
            statusCode : status,
            path : req.url,
            message,
            timestamp : new Date().toISOString(),
        })
    }
}