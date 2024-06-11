import { Router } from "express";
import { AuthRoutes } from './auth/routes'

export class AppRoutes {
    static get routes(): Router{
        const router = Router()

        //Definimos todas las rutas principales del API

        router.use('/api/auth', AuthRoutes.routes)
        /*router.use('/api/user')
        router.use('/api/products')
        router.use('api/clients')
        router.use('/api/clients')
        router.use('/api/orders')*/

        return router
    }
}