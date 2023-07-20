import dotenv from 'dotenv'
import { app } from './app'
import { lyme } from './bot'

dotenv.config()

async function main() {
  const isProd = process.env.NODE_ENV === 'production'
  const host = '::'
  const port = process.env.PORT ?? (isProd ? 80 : 3000)

  try {
    await app.listen({ port: Number(port), host })
    await lyme.run()
  } catch (error) {
    console.error(error)
  }
}

main()
