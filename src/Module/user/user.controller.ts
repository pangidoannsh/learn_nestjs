import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDTO, LoginDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post('/register')
    @UsePipes(ValidationPipe)
    register(@Body() body: CreateUserDTO) {
        return this.userService.create(body)
    }


}
