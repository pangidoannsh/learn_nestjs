import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "../../TypeOrm";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./user.dto";
import { encodePassword } from "src/utils/bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    create(dataUser: CreateUserDTO) {
        const { name, email, password } = dataUser;
        const newUser = this.userRepository.create({
            email, name, created_at: new Date(), password: encodePassword(password)
        })
        return this.userRepository.save(newUser)
    }

    findOneByEmail(email: string) {
        const user = this.userRepository.findOne({
            where: {
                email
            }
        })
        return user;
    }

}