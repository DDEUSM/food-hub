import { Request, Response, NextFunction } from "express";
import { formatHTTPLoggerResponse, httpLogger } from "../logger/logger.config";

/**
 * @function InterceptLogger
 * @description é o middleware para capturar os dados dos cabeçalhos http e procressar para logs  
 */

export function InterceptLogger(req: Request & Record<string, any>, res: Response, next: NextFunction){

    let startTimeDuration = Date.now()

    const originalSend = res.send

    let body: Record<string, any>
    let error: Record<string,any>

    let isLogged = false

    res.on('finish', () => {
        isLogged = true
        req.clientHasDroppedBeforeResponse = false
        if(error) {
            return httpLogger.error(
                error.message,
                formatHTTPLoggerResponse(req, res, body, startTimeDuration, error)
            );
        }
        httpLogger.info(
            'Some Success message',
            formatHTTPLoggerResponse(req, res, body, startTimeDuration)
        );
    })

    res.on('close', () => {        
        if(!isLogged){
            req.clientHasDroppedBeforeResponse = true
            httpLogger.error(
                body.message,
                formatHTTPLoggerResponse(req, res, body, startTimeDuration, error)
            );
        }
    })

    res.send = function (responseBody: Record<string, any>): any {

        if(responseBody.error){
            error = responseBody.error
            return originalSend.call(this, responseBody.error.message);            
        }
        body = responseBody
        originalSend.call(this, responseBody);
    };
    next();
}