import { CustomError, User } from "../../domain"

export class UserMapper {
    constructor() {}
    static userEntityFromObject (object: { [key: string]: any}) {
        const { id, _id, nombre, email, password, roles} = object

        if(!_id || !id) {
            throw CustomError.badRequest('No tiene id')
        }

        if(!nombre) throw CustomError.badRequest('Nombre es requerido')
        if(!email) throw CustomError.badRequest('Email es requerido')
        if(!password) throw CustomError.badRequest('Password es requerido')
        if(!roles) throw CustomError.badRequest('Role es requerido')

        return new User(
            id || _id,
            nombre,
            email,
            password,
            roles
        )
    }
}