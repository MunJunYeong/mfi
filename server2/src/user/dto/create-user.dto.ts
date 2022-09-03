import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly id: string;
    @IsNotEmpty()
    readonly pw: string;
    @IsNotEmpty()
    readonly name: string;
}
