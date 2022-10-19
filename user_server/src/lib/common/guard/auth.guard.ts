// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';


// //Guards 는 모든 middleware의 다음에 실행되고, interceptor 나 pipe 이전에 실행된다.
// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     console.log(request);
//     return validateRequest(request);
//   }
// }