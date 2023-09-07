import { Message } from 'discord.js'
import { apiNinjasService } from '../../core/services/api-ninjas'

export async function fact(message: Message) {
  try {
    const [fact] = await apiNinjasService.getFacts(1)
    message.reply(fact)
  } catch (error) {
    message.reply('There was an error when trying to get a fact')
  }
}
