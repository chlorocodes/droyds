import { Message } from 'discord.js'

export async function snitch(message: Message) {
  if (!message.reference) {
    return
  }

  const authorityId = process.env.AUTHORITY_ID as string
  const reference = await message.fetchReference()

  return reference.reply(
    `<@${authorityId}>: Please take a look at what ${reference.author} just said`
  )
}
