import { CreateCommandSchema } from '../schemas/bot.js'
import { RouteHandler } from '../types/routes.js'

export const createCommand: RouteHandler<CreateCommandSchema> = async (req) => {
  console.log(req)
}
