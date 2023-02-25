import { Body, Controller, Post, UseGuards, Res, UsePipes, ValidationPipe, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response, Request } from "express";
import { LoginDTO } from "../user/user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() body: LoginDTO, @Res({ passthrough: true }) res: Response) {

        const token = await this.authService.validateUser(body.email, body.password);

        if (token) {
            res.status(202).cookie('jwt', token, { httpOnly: true });
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.status(205).clearCookie('jwt');
    }
}