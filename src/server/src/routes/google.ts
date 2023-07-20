import * as controller from '../controllers/google'
import * as schema from '../schemas/google'
import { TypedRouter } from '../types/routes'

export async function googleRoutes(router: TypedRouter) {
  router.route({
    method: 'POST',
    url: '/translate',
    schema: schema.googleSchema,
    handler: controller.createTranslation
  })
}
