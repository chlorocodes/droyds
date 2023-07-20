import { join } from 'node:path'
import { Lyme } from '@lyme/bot'
import { db } from '../prisma/db'

export const lyme = new Lyme({
  assetsPath: join(__dirname, 'assets')
})

db.command
  .findMany({ include: { aliases: true } })
  .then((commands) => lyme.registerCommands(commands))
  .catch((error) => console.error(error))
