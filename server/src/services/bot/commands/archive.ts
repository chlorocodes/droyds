import { Message } from 'discord.js'
import { archiver } from '../../archiver'

export async function archive(message: Message) {
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
