import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from "argon2";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userIdx: number;

    @Column({length:15})
    id: string;

    @Column({length:15})
    pw: string;

    @Column({length:5})
    name: string;

    // DB에 넣기 전에 비밀번호 복호화 할 수 없게 hash함수를 이용해 저장
    @BeforeInsert()
    async hashPw(){
        this.pw = await argon2.hash(this.pw);
    }
}
