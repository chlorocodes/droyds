import { Type } from '@sinclair/typebox'

export type ChatSchema = typeof chatSchema
export const chatSchema = {
  body: Type.Object({
    user: Type.String(),
    question: Type.String()
  }),
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      reply: Type.String()
    })
  }
}
