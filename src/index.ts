import express, { Router } from 'express'
import cors from 'cors'
import { Container } from 'inversify'
import { injectRoutes } from './dependency-injection/inject-routes'
import path from 'path'
import { APP_HOST, APP_PORT } from './env'
import { PrismaClient } from '@prisma/client'
import { ErrorHandler } from './middlewares/errorHandler'

const app = express()
const router = Router()
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(express.static(path.join(__dirname, 'public')))

app.disable('x-powered-by')

const prisma = new PrismaClient({log: ['query']})

const globalContainer = new Container({ autoBindInjectable: true })

globalContainer.bind<Router>(Router).toConstantValue(router)
globalContainer.bind<PrismaClient>(PrismaClient).toConstantValue(prisma)

injectRoutes(globalContainer)

app.use(router)

app.use(ErrorHandler as any)

app.listen(APP_PORT, () => console.log(`server listening on http://${APP_HOST}:${APP_PORT}`))
