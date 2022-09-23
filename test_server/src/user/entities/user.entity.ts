import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from "argon2";
import { Product } from "../../product/entities/product.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    userIdx: number;

    @Column()
    id: string;

    @Column()
    pw: string;

    @Column()
    nickName: string;

    @Column()
    email: string;

    @Column({ type: 'timestamptz' })
    created: Date;

    @Column()
    status: string;

    @Column()
    role: string;

    // @OneToMany(()=> Product, (product)=> product.user, {
    //     onDelete : 'CASCADE',
    //     nullable: true
    // })
    // products: Product[];

    // DB에 넣기 전에 비밀번호 복호화 할 수 없게 hash함수를 이용해 저장
    // @BeforeInsert()
    // async hashPw(){
    //     this.pw = await argon2.hash(this.pw);
    // }
}
