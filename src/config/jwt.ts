import jwt from 'jsonwebtoken'

export class JWT {
    static async generateToken(payload: Object, duration: string = '2h'): Promise<string|null> {
        return new Promise ( (resolve) => {
            jwt.sign(payload, 'SEED', { expiresIn: duration} , (error, token) => {
                if ( error) return resolve(null)
            
                resolve(token!)    
            })
        })
    }
}