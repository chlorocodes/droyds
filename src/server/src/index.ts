import dotenv from 'dotenv'
import { app } from './app.js'

dotenv.config()

const isProd = process.env.NODE_ENV === 'production'
const host = '::'
const port = process.env.PORT ? Number(process.env.PORT) : isProd ? 80 : 3000

app.listen({ host, port }).catch((error) => console.error(error))
