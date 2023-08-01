import { Message } from 'discord.js'
import { botInfo } from '../config/bot-info'

export async function snitch(message: Message) {
  if (!message.reference) {
    return message.reply("I don't know what you want me to snitch on")
  }

  const authorityId = botInfo.shibuyaOwnerId
  const reference = await message.fetchReference()

  return reference.reply(
    `<@${authorityId}>: Please take a look at what ${reference.author} just said`
  )
}
