import { Injectable } from '@nestjs/common';
import { User } from '..//user/entities/user.entity';
import { UserRepo } from '../user/user.repo';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepo } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepo, private userRepo: UserRepo){}

  async create(createProductDto: CreateProductDto) {
    const {name, price, userIdx} = createProductDto;
    const newProduct = new Product();
    let user: User = new User();
    try{
      user = await this.userRepo.findOne({
         where : {
          userIdx: userIdx
        }
      })
    }catch(err){
      console.log(err);
    }
    newProduct.user = user;
    newProduct.name = name;
    newProduct.price = price;
    
    let result: object;
    
    try{
      result = await this.productRepo.save(newProduct);
    }catch(err){
      console.log(err);
    }

    return result;
  }

  async findAll() {
    let result: Product[];
    try{
      result =  await this.productRepo.find();
    }catch(err){
      console.log(err);
    }
    return result;
  }

  async findOne(productIdx: number) {
    let result: Product;
    try{
      result=  await this.productRepo.findOne({
        where : {
          productIdx : productIdx
        },
        relations : ['user']
      })
    }catch(err) {
      console.log(err);
    }
    return result;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
