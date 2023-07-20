import * as controller from '../controllers/openai'
import * as schema from '../schemas/openai'
import { TypedRouter } from '../types/routes'

export async function openAIRoutes(router: TypedRouter) {
  router.route({
    method: 'POST',
    url: '/chat',
    schema: schema.chatSchema,
    handler: controller.createReply
  })
}
