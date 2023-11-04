import { roaster } from '@droyds/core/services'
import { Message } from 'discord.js'

export async function mock(message: Message) {
  if (!message.reference) {
    return message.reply('You need to reply to a message when you do !mock')
  }
  const reference = await message.fetchReference()
  const mockingcase = roaster.mock(reference.content)
  reference.reply(mockingcase)
}
