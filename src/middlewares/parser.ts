import { Request, Response, NextFunction } from "express"



export class InputValidator
{
    static fromBody<T extends { parse: (arg:any) => any }>(dtoSchema: T){
        return function(req: Request&Record<string,any>, res: Response, next: NextFunction){
            try {
                req.dto = dtoSchema.parse(req.body)
                return next()
            } catch (error) {
                return next(error)
            }
        }
    }

    
    static fromQuery<T extends { parse: (arg:any) => any }>(dtoSchema: T){        
        return function(req: Request&Record<string,any>, res: Response, next: NextFunction){
            try {
                req.dto = dtoSchema.parse(req.query)
                return next()
            } catch (error) {
                return next(error)
            }
        }
     }
 
}
