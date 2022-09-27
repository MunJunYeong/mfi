import { CustomRepository } from "src/lib/db/typeorm-ex.decorator";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@CustomRepository(User)
export class UserRepo extends Repository<User>{

}