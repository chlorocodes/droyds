import dotenv from 'dotenv'
import { lyme } from './bot'
import { app } from './app'

dotenv.config()

const isProd = process.env.NODE_ENV === 'production'
const host = '::'
const port = process.env.PORT ?? (isProd ? 80 : 3000)

app.listen({ port: Number(port), host }, (err) => {
  if (err) {
    console.error(err)
  }
  lyme.run()
})
