import { Request } from "express";
import jwt from 'jsonwebtoken'
import { PUBLIC_KEY } from "../env";
import { AuthError } from "../errors/auth.error";

export type Resolver = (value: unknown) => void
export type Rejector = (reason?: any) => void


export function expressAuthentication(
    req: Request,
    securityName: "api_key" | "jwt",
    scopes?: Array<"admin"|"">
){
    if (securityName == "jwt") {
        
        return new Promise(( resolve, reject ) => {
            console.log(req.headers)
            if (!req.headers.authorization) {
                reject(AuthError.TokenNotProvided) 
            }   
            
            const jwtToken = (req.headers.authorization!.split(' '))[1]        
    
            jwt.verify(jwtToken, PUBLIC_KEY, (error: any, decoded: any) => {
                if (error) {
                    reject(AuthError.InvalidToken)
                }
                if (!decoded) {
                    reject(new Error('payload vazio'))
                }

                if (scopes) {

                    for (let scope of scopes) {
                        if (!decoded.scopes.includes(scope)) {
                            reject(AuthError.UnauthorizedToken)
                        }
                    }
                }
                
                resolve(decoded)
            })        
       })
    }
}
