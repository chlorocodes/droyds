import * as controller from '../controllers/auth.js'
import * as schemas from '../schemas/auth.js'
import { TypedRouter } from '../types/routes.js'

export async function authRoutes(router: TypedRouter) {
  router.route({
    method: 'GET',
    url: '/',
    handler: controller.auth
  })

  router.route({
    method: 'GET',
    url: '/login',
    schema: schemas.loginSchema,
    handler: controller.login
  })
}
