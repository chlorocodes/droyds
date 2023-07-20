import { Type } from '@sinclair/typebox'

export type GetFactsSchema = typeof getFactsSchema
export const getFactsSchema = {
  querystring: Type.Object({
    count: Type.Optional(Type.Number())
  }),
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      facts: Type.Array(Type.String())
    })
  }
}
