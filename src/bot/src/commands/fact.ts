import { Message } from 'discord.js'
import { api } from '../api/client'

export async function fact(message: Message) {
  try {
    const fact = await api.getRandomFact()
    message.reply(fact)
  } catch (error) {
    message.reply('There was an error when trying to get a fact')
  }
}
