import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/TypeOrm";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), PassportModule,
        JwtModule.register({
            secret: "secret",
            signOptions: {
                expiresIn: '1d'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
    exports: [AuthService]
})
export class AuthModule {

}