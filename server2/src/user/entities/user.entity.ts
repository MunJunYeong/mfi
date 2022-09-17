import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from "argon2";
import { Product } from "../../product/entities/product.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    userIdx: number;

    @Column({length:200})
    id: string;

    @Column({length:200})
    pw: string;

    @Column({length:200})
    name: string;

    @OneToMany(()=> Product, (product)=> product.user, {
        onDelete : 'CASCADE'
    })

    // DB에 넣기 전에 비밀번호 복호화 할 수 없게 hash함수를 이용해 저장
    @BeforeInsert()
    async hashPw(){
        this.pw = await argon2.hash(this.pw);
    }
}
