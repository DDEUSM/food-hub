import winston from 'winston'
import { Request, Response } from 'express';
import { randomBytes } from 'crypto';

//const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const generateLogId = (): string => randomBytes(16).toString('hex')


export const httpLogger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.printf(({timestamp, level, message, ...data}) => {
            const response = {
                level,
                logId: generateLogId(),
                timestamp,
                appInfo: {
                    processId: process.pid
                },
                message,
                data,
            }            
            return JSON.stringify(response, null, ' ')
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './logs/app-logs.log'
        })
    ]   
})

/**
 * @function formatHTTPLoggerResponse
 * @description É a função responsável por definir e capturar os parâmetros específicos dos cabeçalhos http
 */

export function formatHTTPLoggerResponse(req: Request&{[key:string]: any}, res: Response, responseBody: any, startTimeDuration: number, error?: any){
    try {
        const duration = Date.now() - startTimeDuration 
        const durationTimeInSeconds = `${duration / 1000}s`             
        console.log(responseBody)
        let results = {
            error: () => ({ error: { message: error.message.replaceAll('\n').trim(), stack: error.stack.replaceAll("\n").trim() } }),
            body: () => ({ body: typeof responseBody === 'string'?  JSON.parse(responseBody) : responseBody })
        }            

        return {
            request: {
                headers: req.headers,
                host: req.headers.host,
                baseUrl: req.baseUrl,
                url: req.url,
                method: req.method,
                body: req.body,
                params: req?.params,
                query: req?.query,
                clientIp:
                req.headers['x-forwarded-for'] ?? req?.socket.remoteAddress,
            },
            response: {
                headers: res.getHeaders(),
                statusCode: res.statusCode,
                requestDuration: durationTimeInSeconds,
                clienteDesistiu: req.clientHasDroppedBeforeResponse,
                ...error? results.error() : results.body()
            },
        }
    } catch(error: unknown){        
    }
}