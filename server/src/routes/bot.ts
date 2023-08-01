import * as controller from '../controllers/bot'
import * as schemas from '../schemas/bot'
import { TypedRouter } from '../types/routes'

export async function botRoutes(router: TypedRouter) {
  router.route({
    method: 'POST',
    url: '/commands',
    schema: schemas.createCommandSchema,
    handler: controller.createCommand
  })

  router.route({
    method: 'POST',
    url: '/suggestions',
    schema: schemas.createSuggestionSchema,
    handler: controller.createSuggestion
  })
}
