import { Type } from '@sinclair/typebox'

export type CreateCommandSchema = typeof createCommandSchema
export const createCommandSchema = {
  body: Type.Object({
    name: Type.String(),
    response: Type.String(),
    responseType: Type.Enum(Type.Literal('text'), Type.Literal('image'))
  }),
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      id: Type.String()
    })
  }
}

export type GetCommandsSchema = typeof getCommandsSchema
export const getCommandsSchema = {
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      commands: Type.Array(
        Type.Object({
          name: Type.String(),
          response: Type.String(),
          responseType: Type.Enum(Type.Literal('text'), Type.Literal('image'))
        })
      )
    })
  }
}

export type CreateSuggestionSchema = typeof createSuggestionSchema
export const createSuggestionSchema = {
  body: Type.Object({
    suggestion: Type.String()
  }),
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      id: Type.String()
    })
  }
}

export type GetSuggestionsSchema = typeof getSuggestionsSchema
export const getSuggestionsSchema = {
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      suggestions: Type.Array(Type.String())
    })
  }
}
