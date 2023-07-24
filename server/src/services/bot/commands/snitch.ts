import { Message } from 'discord.js'

export async function snitch(message: Message) {
  if (!message.reference) {
    return message.reply("I don't know what you want me to snitch on")
  }

  const reference = await message.fetchReference()
  return message.reply(
    `${message.author} wants you take a look at what ${reference.author} just said`
  )
}
