import { AuthDataSource, CustomError, RegisterUserDto, User } from "../../domain";

//se implemtaran las reglas del domain
export class AuthDataSourceImpl implements AuthDataSource {
    async register(registerUserDto: RegisterUserDto): Promise<User> {
        
        const { nombre, email, password} = registerUserDto

        try {
            /*
            Caso de Uso:
            1.- verificar
            2.- hash de contraseña
            3.- mapear la respuesta a nuestra entidad
            */
           return new User (
            '1',
            nombre,
            email,
            password,
            ['ADMIN_ROLE'],
           )

        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer()
        }
    }
}


