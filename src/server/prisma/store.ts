import { FastifySessionObject, SessionStore } from '@fastify/session'
import { db } from './db'
import { Session } from 'fastify'

type Callback = Parameters<SessionStore['set']>[2]
type CallbackSession = Parameters<SessionStore['get']>[1]

export class PrismaStore implements SessionStore {
  async set(
    sessionId: string,
    session: FastifySessionObject,
    callback: Callback
  ) {
    try {
      await db.session.upsert({
        where: { id: sessionId },
        create: { id: sessionId },
        update: {
          userId: session.userId,
          username: session.username
        }
      })
      callback(null)
    } catch (error) {
      console.error(error)
      callback(error)
    }
  }

  async get(sessionId: string, callback: CallbackSession) {
    try {
      const session = (await db.session.findUnique({
        where: { id: sessionId }
      })) as unknown as Session
      callback(null, session)
    } catch (error) {
      callback(error, null)
    }
  }

  async destroy(sessionId: string) {
    try {
      await db.session.delete({
        where: { id: sessionId }
      })
    } catch (error) {
      console.error(error)
    }
  }
}
