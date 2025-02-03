import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors/api.error'
import { AuthError } from '../errors/auth.error'

const ErrorHandler: ErrorRequestHandler = function (error: unknown, req: Request, res: Response, next: NextFunction){
    if(error instanceof ApiError){
        return res.status(error.statusCode).send({ message: error.message })     
    }
    if(error instanceof AuthError){
        return res.status(error.statusCode).send({ message: error.message })
    }
    res.status(500).send({ error }) 
} as any

export { ErrorHandler };