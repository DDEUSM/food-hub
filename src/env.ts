import { createPublicKey } from 'crypto'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import path from 'path'

dotenv.config()

export const APP_PORT = Number(process.env.PORT) || 1445
export const APP_HOST = process.env.HOST as string
export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT)
export const POSTGRES_USER = process.env.POSTGRES_USER
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD


export const CLIENT_CERT_FINGERPRINT = process.env.CLIENT_CERT_FINGERPRINT
export const CLIENT_CERT_SERIAL = process.env.CLIENT_CERT_SERIAL

const relativePaths: Record<'production'|'development', string[]> = {
    production: [__dirname, '..', '..', 'certs'],
    development: [__dirname, '..', 'certs']
}

const NODE_ENV = process.env.NODE_ENV as keyof Record<'production'|'development', string[]>
const keysPath = path.resolve(...relativePaths[NODE_ENV])

const CERT = readFileSync(path.resolve(keysPath, 'server.crt'))
export const PUBLIC_KEY = createPublicKey(CERT)
export const PRIVATE_kEY = readFileSync(path.resolve(keysPath, 'server.key'))
