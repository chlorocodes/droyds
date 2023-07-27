import { Message } from 'discord.js'
import { archiver } from '../../archiver'

export async function archive(message: Message) {
  if (message.channel.id !== process.env.DISCORD_BOT_DEBUG_CHANNEL_ID) {
    return message.reply('Coming soon')
  }

  if (!message.guild?.id) {
    return message.reply('Cannot archive outside of a Discord server')
  }

  if (message.reference) {
    const reference = await message.fetchReference()
    await archiver.takeMessageScreenshot(
      reference.content,
      reference.guild?.id as string,
      reference.channel.id
    )
  } else {
    await archiver.takePageScreenshot(message.guild.id, message.channel.id)
  }

  await message.channel.send({
    files: [{ attachment: archiver.screenshotPath }]
  })
}
