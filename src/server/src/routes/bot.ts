import * as controller from '../controllers/bot.js'
import * as schemas from '../schemas/bot.js'
import { TypedRouter } from '../types/routes.js'

export async function botRoutes(router: TypedRouter) {
  router.route({
    method: 'POST',
    url: '/commands',
    schema: schemas.createCommandSchema,
    handler: controller.createCommand
  })
}
