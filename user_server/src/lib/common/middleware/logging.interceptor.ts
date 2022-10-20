import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from '../jwt';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;


    return next
      .handle()
      .pipe(
        // tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}