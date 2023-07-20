import { Type } from '@sinclair/typebox'

export type GoogleSchema = typeof googleSchema
export const googleSchema = {
  body: Type.Object({
    text: Type.String()
  }),
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      translation: Type.String()
    })
  }
}
