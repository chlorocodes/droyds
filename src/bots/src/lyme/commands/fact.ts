import { apiNinjasService } from '@droyds/core/services'
import { Message } from 'discord.js'
import { lyme } from '../lyme.js'

export async function fact(message: Message) {
  try {
    const [fact] = await apiNinjasService.getFacts(1)
    lyme.addToConversation(fact)
    message.reply(fact)
  } catch (error) {
    message.reply('There was an error when trying to get a fact')
  }
}
