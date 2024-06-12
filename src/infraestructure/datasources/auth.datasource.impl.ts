import { UserModel } from "../../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDto, User } from "../../domain";

//se implemtaran las reglas del domain
export class AuthDataSourceImpl implements AuthDataSource {
    async register(registerUserDto: RegisterUserDto): Promise<User> {
        
        const { nombre, email, password} = registerUserDto

        try {
            
            //Caso de Uso:
            //1.- verificar si el correo existe
            const exists = await UserModel.findOne({email: email})
            if (exists) throw CustomError.badRequest('El email de usuario ya existe')

            //2.- hash de contraseña
            const user = await UserModel.create({
                nombre: nombre,
                email: email,
                password: password
            })

            await user.save()
            //3.- mapear la respuesta a nuestra entidad
            
           return new User (
            user.id,
            nombre,
            email,
            password,
            user.roles,
           )

        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer()
        }
    }
}


