import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepo {
  create() {
    return 'iam repo';
  }

}
