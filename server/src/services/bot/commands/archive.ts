import { ChannelManager, GuildTextBasedChannel, Message } from 'discord.js'
import { archiver } from '../../archiver'
import { botInfo } from '../config/bot-info'

export async function archive(message: Message, channels: ChannelManager) {
  if (!message.guild?.id) {
    return message.reply('Cannot archive outside of a Discord server')
  }

  try {
    await archiver.takePageScreenshot(message.guild.id, message.channel.id)
  } catch (error) {
    console.error(error)
    return message.reply('Error when trying to generate screenshot')
  }

  if (message.channel.id === botInfo.debugChannelId) {
    return message.channel.send({
      files: [{ attachment: archiver.screenshotPath }]
    })
  }

  const archiveChannel = channels.cache.get(
    botInfo.archiveChannelId
  ) as GuildTextBasedChannel

  await archiveChannel.send({
    files: [{ attachment: archiver.screenshotPath }]
  })

  message.reply(
    `Screenshot generated and posted to <${archiveChannel.toString()}>`
  )
}
