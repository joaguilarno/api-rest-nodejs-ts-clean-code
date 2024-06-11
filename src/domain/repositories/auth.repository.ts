// nuestra clase solo servirá para ser expandida o para implementarla y tendrá un argumento para permitir el cambio

import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { User } from "../entities/user.entity";

// solo sirve para definir reglas generales
export abstract class AuthRepository {

   // todo:
   // abstract login(loginUserDto: LoginUserDto): Promise<user> 

   abstract register(registerUserDto: RegisterUserDto): Promise<User>
}