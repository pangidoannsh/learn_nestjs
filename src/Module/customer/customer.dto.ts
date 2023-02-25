import { IsEmail, IsNotEmpty } from "class-validator";

class CreateCustomerDTO {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    name: string;
}

export { CreateCustomerDTO }