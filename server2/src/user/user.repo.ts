import { CustomRepository } from "../db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { TypeOrmExModule } from "../db/typeorm-ex.module";
import { Product } from "../product/entities/product.entity";
import { time } from "console";

//TypeORM 0.3.0부터 EntityRepository가 deprecated 됨.
// @EntityRepository(User)

@CustomRepository(User)
export class UserRepo extends Repository<User>{
    async findAllUserList11() {
      const userRepo = this.manager.getRepository(User);
      
      const user: User = new User();
      user.userIdx = 4;
      user.id = 'bbbb';
      user.pw = '1111';
      user.name = '11111';

      this.manager.transaction(async (t) => {
        const reuslt = await t.find(User, {where : { userIdx : 1, }});
        console.log(reuslt);
        const res = await t.save(user);
        console.log(res);
        const reuslt22 = await t.find(User, {where : { userIdx : 4, }});
        if(reuslt22) throw Error(); 
        const res2 = await t.save(user);
        console.log(res2);
      })


  }



}
