import { GoogleSchema } from '../schemas/google'
import { googleService } from '../services/google'
import { RouteHandler } from '../types/routes'

export const createTranslation: RouteHandler<GoogleSchema> = async (req) => {
  const { text } = req.body
  const translation = await googleService.translate(text)
  return { status: 'success', translation }
}
