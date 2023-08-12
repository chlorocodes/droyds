import dotenv from 'dotenv'
import { app } from './app'
import { lyme } from './services/bots/lyme'

dotenv.config()

const isProd = process.env.NODE_ENV === 'production'
const host = '::'
const port = Number(process.env.PORT) ?? (isProd ? 80 : 3000)

app
  .listen({ host, port })
  .then(() => lyme.start())
  .catch((error) => console.error(error))
