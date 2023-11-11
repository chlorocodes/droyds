import * as controller from '../controllers/one-word-story.js'
import * as schemas from '../schemas/one-word-story.js'
import { TypedRouter } from '../types/routes.js'

export async function oneWordStoryRoutes(router: TypedRouter) {
  router.route({
    method: 'GET',
    url: '/words',
    schema: schemas.getAllWordsSchema,
    handler: controller.getAllWords
  })

  router.route({
    method: 'GET',
    url: '/authors',
    schema: schemas.getAllAuthorsSchema,
    handler: controller.getAllAuthors
  })
}
