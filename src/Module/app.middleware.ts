import { Injectable, NestMiddleware, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class AppMiddleWare implements NestMiddleware {
    constructor(
        private readonly authService: AuthService
    ) { }
    use(@Req() req: Request, @Res() res: Response, next: (error?: any) => void) {
        const userToken = req.cookies['jwt'];
        const data = this.authService.getUser(userToken)
        // res.send(data)
        if (data) {
            next();
        } else {
            res.status(403).send({ error: "No Authentication Token Provided" });
        }
    }
}