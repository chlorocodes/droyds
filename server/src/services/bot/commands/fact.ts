import { Message } from 'discord.js'
import { apiNinjasService } from '../../api-ninjas'
import { botInfo } from '../config/bot-info'

export async function fact(message: Message) {
  if (
    message.channel.id !== botInfo.channelId &&
    message.channel.id !== botInfo.debugChannelId
  ) {
    return message.reply(
      `If you would like to see some random facts, please head over to <#${botInfo.channelId}> and use the !fact command :blush:`
    )
  }

  try {
    const [fact] = await apiNinjasService.getFacts(1)
    message.reply(fact)
  } catch (error) {
    message.reply('There was an error when trying to get a fact')
  }
}
