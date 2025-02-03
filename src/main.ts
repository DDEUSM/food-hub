import path from "path"
import express, {  Request as ExRequest, Response as ExResponse } from 'express'
import { APP_HOST, APP_PORT } from "./env"
import { ErrorHandler } from "./middlewares/errorHandler"
import cors from 'cors'
import { InterceptLogger } from "./middlewares/interceptLogger"
import { RegisterRoutes } from "./routes.config/routes"


function main(){       

    const app = express()

    app.disable('x-powered-by')
    app.use(cors({ origin: '*' }))
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.json()) 
    app.use(express.urlencoded({ extended: true })) 
    
    app.use(InterceptLogger);    
    
    RegisterRoutes(app);   

    app.use(ErrorHandler);
    
    app.listen(APP_PORT, () => {
        console.log(`server listening on http://${APP_HOST}:${APP_PORT}`)
        setTimeout(() => {
            const RSS = process.memoryUsage().rss / (1000 * 1000)
            console.log(`Memory Resident Size ${RSS}MB`)
        }, 3000);        
    })   
}  

main();

