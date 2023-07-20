import { ChatSchema } from '../schemas/openai'
import { chatService } from '../services/openai'
import { RouteHandler } from '../types/routes'

export const createReply: RouteHandler<ChatSchema> = async (req) => {
  const { user, question } = req.body
  const reply = await chatService.chat({ user, question })
  return { status: 'success', reply }
}
