import { GetFactsSchema } from '../schemas/api-ninjas'
import { apiNinjasService } from '../services/api-ninjas'
import { RouteHandler } from '../types/routes'

export const getFacts: RouteHandler<GetFactsSchema> = async (req) => {
  const { count } = req.query
  const facts = await apiNinjasService.getFacts(count)
  return { status: 'success', facts }
}
