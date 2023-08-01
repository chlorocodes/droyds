import {
  CreateCommandSchema,
  CreateSuggestionSchema,
  GetSuggestionsSchema
} from '../schemas/bot'
import { db } from '../services/database'
import { ResponseStatus } from '../types/api'
import { RouteHandler } from '../types/routes'

export const createCommand: RouteHandler<CreateCommandSchema> = async (req) => {
  const { name, response, responseType } = req.body
  const { id } = await db.command.create({
    data: {
      name,
      response,
      responseType
    }
  })

  return {
    status: ResponseStatus.Success,
    id
  }
}

export const createSuggestion: RouteHandler<CreateSuggestionSchema> = async (
  req
) => {
  const { suggestion } = req.body
  const { id } = await db.suggestion.create({ data: { suggestion } })

  return {
    status: ResponseStatus.Success,
    id
  }
}

export const getSuggestions: RouteHandler<GetSuggestionsSchema> = async () => {
  const suggestionItems = await db.suggestion.findMany()
  const suggestions = suggestionItems.map((item) => item.suggestion)

  return {
    status: ResponseStatus.Success,
    suggestions
  }
}
