import { Message } from 'discord.js'
import { roaster } from '../../roaster'

export async function roast(message: Message) {
  try {
    const insult = await roaster.roast()
    if (message.reference) {
      const reference = await message.fetchReference()
      reference.reply(insult)
    } else {
      message.channel.send(insult)
    }
  } catch (error) {
    message.reply('There was an error when attempting to roast')
  }
}
