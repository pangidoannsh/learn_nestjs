import { BadRequestException, Inject, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { comparePassword } from "src/utils/bcrypt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const userDB = await this.userService.findOneByEmail(email);
        if (userDB) {
            if (comparePassword(password, userDB.password)) {
                const jwt = await this.jwtService.signAsync({ id: userDB.id, name: userDB.name, level: userDB.level });
                return jwt;
            }
            else {
                throw new NotAcceptableException
            }
        } else {
            throw new BadRequestException
        }
    }

    getUser(token: string) {
        try {
            const dataUser = this.jwtService.verify(token);
            return dataUser;
        }
        catch (e) {
            throw new UnauthorizedException()
        }
    }
}