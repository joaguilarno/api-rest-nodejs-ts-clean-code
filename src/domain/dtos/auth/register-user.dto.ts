import { Validators } from "../../../config"

export class RegisterUserDto {
    private constructor (        
        public nombre: string,
        public email: string,
        public password: string
    ) {        
    }

    static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {

        const { nombre, email, password } = object

        if (!nombre) return ['Se necesita el nombre']
        if (!email) return ['Se necesita el email']
        if (!Validators.email.test(email)) return ['El email no tiene un formato válido']
        if (!password) return ['Se necesita el password']
        if (password.length < 6) return ['El password es muy corto']

        return [
            undefined,
            new RegisterUserDto(nombre, email, password)
        ]
    }
}
