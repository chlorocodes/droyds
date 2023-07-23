import { Message } from 'discord.js'
import { archiver } from '../../archiver'

export async function archive(message: Message) {
  if (message.channel.id !== process.env.DISCORD_BOT_DEBUG_CHANNEL_ID) {
    return message.reply('Coming soon')
  }

  try {
    if (!message.guild?.id) {
      return message.reply('Cannot archive outside of a Discord server')
    }
    await archiver.takeScreenshot(message.guild.id, message.channel.id)
    await message.channel.send({
      files: [{ attachment: archiver.screenshotPath }]
    })
  } catch (error) {
    console.error(error)
    message.reply('There was an error when trying to generate a screenshot')
  }
}
