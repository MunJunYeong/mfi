import { CustomRepository } from "../db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

//TypeORM 0.3.0부터 EntityRepository가 deprecated 됨.
// @EntityRepository(User)

@CustomRepository(User)
export class UserRepo extends Repository<User>{
    
}
