import { PrismaClient } from '@prisma/client'
import { join } from 'node:path'
import { __dirname } from '../utils/__dirname.js'

const dbPath = `file:${join(__dirname, '..', '..', 'prisma', 'droyds.db')}`

export const db = new PrismaClient({
  datasources: {
    db: {
      url: dbPath
    }
  }
})
