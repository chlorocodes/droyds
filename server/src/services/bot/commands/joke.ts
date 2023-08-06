import { Message } from 'discord.js'
import { jokes } from '../../jokes'

export async function joke(message: Message) {
  const [joke] = await jokes.getJokes(1)
  const jokeMessage = joke.setup + '\n\n' + joke.delivery
  return message.reply(jokeMessage)
}
