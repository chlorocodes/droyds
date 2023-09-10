import { Message } from 'discord.js'

export async function snitch(message: Message) {
  const authorityId = process.env.AUTHORITY_ID as string

  if (!message.reference) {
    return message.reply(
      `<@${authorityId}>: Please take a look at these recent messages which may be problematic`
    )
  }

  const reference = await message.fetchReference()

  return reference.reply(
    `<@${authorityId}>: Please take a look at what ${reference.author} just said`
  )
}
