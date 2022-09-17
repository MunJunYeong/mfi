import { CustomRepository } from "../db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";

@CustomRepository(Product)
export class ProductRepo extends Repository<Product>{
    
}
