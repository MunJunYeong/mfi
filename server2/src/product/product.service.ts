import { Injectable } from '@nestjs/common';
import { User } from '..//user/entities/user.entity';
// import { UserService } from '../user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepo } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepo){}

  async create(createProductDto: CreateProductDto) {
    const {name, price, userIdx} = createProductDto;

    const newProduct = new Product();

    newProduct.name = name;
    newProduct.price = price;

    // const getUser: User = await this.userService.findOneUser(userIdx);
    // console.log(getUser);
    // newProduct.user = getUser;
    console.log(newProduct)
    // return await this.productRepo.clear(getUser);
    return 'aa';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
