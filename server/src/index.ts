import dotenv from 'dotenv'
import { app } from './app'
import { lyme } from './services/bot'
import { db } from './services/database'

dotenv.config()

async function main() {
  const isProd = process.env.NODE_ENV === 'production'
  const host = '::'
  const port = process.env.PORT ?? (isProd ? 80 : 3000)

  try {
    const commands = await db.command.findMany({ include: { aliases: true } })
    lyme.registerSimpleCommands(commands)
    await app.listen({ port: Number(port), host })
    await lyme.start()
  } catch (error) {
    console.error(error)
  }
}

main()
