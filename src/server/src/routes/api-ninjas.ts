import * as controller from '../controllers/api-ninjas'
import * as schemas from '../schemas/api-ninjas'
import { TypedRouter } from '../types/routes'

export async function apiNinjasRoutes(router: TypedRouter) {
  router.route({
    method: 'GET',
    url: '/facts',
    schema: schemas.getFactsSchema,
    handler: controller.getFacts
  })
}
