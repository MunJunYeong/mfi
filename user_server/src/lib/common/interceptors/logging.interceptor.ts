import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '../jwt';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
){}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if(!req.headers.authorization){
      throw new Error('block wrong access'); 
    }
    console.log(req.user);
    // const decodedToken = await this.jwtService.verifyAsync(req.headers.authorization);
    // console.log(decodedToken)
    // if(!decodedToken.hasOwnProperty('userIdx')){
    //   throw new Error('wrong token');
    // }
    // req['user'] = decodedToken;
    return next.handle().pipe(

        // tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}