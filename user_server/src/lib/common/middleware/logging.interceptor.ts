import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const value = context.switchToHttp().getResponse();
    //   console.log(value.input.userIdx);
    //   console.log(context.getArgs());
    const now = Date.now();
    return next
      .handle()
      .pipe(
        // tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}