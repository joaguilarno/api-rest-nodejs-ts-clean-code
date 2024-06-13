import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDto, User } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

//se implemtaran las reglas del domain
export class AuthDataSourceImpl implements AuthDataSource {

    constructor (
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        
        const { nombre, email, password} = registerUserDto

        try {
            
            //Caso de Uso:
            //1.- verificar si el correo existe
            const exists = await UserModel.findOne({email: email})
            if (exists) throw CustomError.badRequest('Ocurrió un error al registrar el usuario') //El email de usuario ya existe, el usuario ya existe

            //2.- hash de contraseña
            const user = await UserModel.create({
                nombre: nombre,
                email: email,
                password: this.hashPassword(password)
            })
            await user.save()

            //3.- mapear la respuesta a nuestra entidad            
           return UserMapper.userEntityFromObject(user)

        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer()
        }
    }
}


