import { join } from 'node:path'
import server from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import serveStatic from '@fastify/static'
import { PrismaStore } from './services/database'
import { authRoutes } from './routes/auth'
import { botRoutes } from './routes/bot'

const ONE_MONTH = 1000 * 60 * 60 * 24 * 30

export const app = server({
  logger: true
})

app.register(fastifyCookie)
app.register(fastifySession, {
  secret: process.env.SESSION_SECRET as string,
  cookie: { secure: 'auto', maxAge: ONE_MONTH },
  store: new PrismaStore()
})
app.register(serveStatic, { root: join(__dirname, '..') })
app.register(authRoutes, { prefix: '/api/auth' })
app.register(botRoutes, { prefix: '/api/bot' })

app.get('/account', (req) => {
  const { userId, username } = req.session
  return { status: 'success', userId, username }
})
