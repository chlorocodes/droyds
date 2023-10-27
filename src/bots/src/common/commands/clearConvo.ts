import { Message } from 'discord.js'
import { Bot } from '../bot.js'

export async function clearConvo(
  message: Message,
  clearConvo: () => void,
  botInfo: Bot['settings']
) {
  clearConvo()
  return message.reply(`${botInfo.name}'s conversation history has been erased`)
}
