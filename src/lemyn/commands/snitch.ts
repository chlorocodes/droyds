import { Message } from 'discord.js'

export async function snitch(message: Message) {
  const authorityId = process.env.AUTHORITY_ID as string

  if (!message.reference) {
    return message.reply(`<@${authorityId}>: Look at these recent messages`)
  }

  const reference = await message.fetchReference()

  return reference.reply(`<@${authorityId}>: Get this mf`)
}
