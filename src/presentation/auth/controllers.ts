import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain"
import { JWT } from "../../config"

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log(error) // se podria usar winston logger
        return res.status(500).json({error: 'Internal Server Error'})
    }

    loginUser = (req: Request, res: Response) => {
        res.json(req.body)
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) return res.status(400).json({error})
        
            this.authRepository.register(registerUserDto!)
                .then( async (user) => res.json(
                    {
                        user,
                        token: await JWT.generateToken({email: user.email})
                    }
                ))
                .catch(error => this.handleError(error, res))
    }

}