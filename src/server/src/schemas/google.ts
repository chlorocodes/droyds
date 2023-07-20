import { Type } from '@sinclair/typebox'

export type TranslateSchema = typeof translateSchema
export const translateSchema = {
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
