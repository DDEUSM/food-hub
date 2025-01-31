import dotenv from 'dotenv'

dotenv.config()

export const APP_PORT = Number(process.env.PORT) || 1445
export const APP_HOST = process.env.HOST as string
export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT)
export const POSTGRES_USER = process.env.POSTGRES_USER
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD

