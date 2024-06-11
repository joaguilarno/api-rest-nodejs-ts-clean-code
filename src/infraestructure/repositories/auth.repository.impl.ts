import { AuthDataSource, AuthRepository, RegisterUserDto, User } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
    constructor (
        private readonly authDataSource: AuthDataSource
    ){}

    register(registerUserDto: RegisterUserDto): Promise<User> {
        return this.authDataSource.register(registerUserDto)
    }
}