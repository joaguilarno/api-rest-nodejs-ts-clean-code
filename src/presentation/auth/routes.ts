import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infraestructure";

export class AuthRoutes {

    static get routes(): Router{
        const router = Router()

        const database = new AuthDataSourceImpl
        const authRepository = new AuthRepositoryImpl(database)
        const controller = new AuthController(authRepository)

        //Definimos todas las rutas del API para /api/auth
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)

        return router
    }
}