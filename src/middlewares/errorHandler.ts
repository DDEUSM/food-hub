import { NextFunction, Request, Response } from "express";

export function ErrorHandler(error: any, req: Request, res: Response, next: NextFunction){

    console.log(error)

    if(error instanceof Error){
        return res.status(400).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
}