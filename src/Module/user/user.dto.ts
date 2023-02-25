import { IsEmail, IsNotEmpty } from "class-validator";

class LoginDTO {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

class CreateUserDTO {
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
export { LoginDTO, CreateUserDTO }