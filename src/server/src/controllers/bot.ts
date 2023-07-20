import { CreateCommandSchema } from '../schemas/bot'
import { googleService } from '../services/google'
import { RouteHandler } from '../types/routes'

export const createCommand: RouteHandler<CreateCommandSchema> = async (req) => {
  const { name, response, responseType } = req.body
}
