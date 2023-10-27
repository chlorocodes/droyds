import { Message } from 'discord.js'
import { apiNinjasService } from '../../../core/services/api-ninjas'
import { lyme } from '../lyme'

export async function fact(message: Message) {
  try {
    const [fact] = await apiNinjasService.getFacts(1)
    lyme.addToConversation(fact)
    message.reply(fact)
  } catch (error) {
    message.reply('There was an error when trying to get a fact')
  }
}
