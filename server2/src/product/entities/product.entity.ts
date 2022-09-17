import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    productIdx: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(()=> User, (user)=> user.userIdx, {nullable: true})
    @JoinColumn([
        {
            name : 'userIdx',
            referencedColumnName : 'userIdx'
        },
    ])
    user: User;

}
