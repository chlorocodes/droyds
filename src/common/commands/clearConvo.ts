import { Message } from 'discord.js'
import { Bot } from '../bot'

export async function clearConvo(
  message: Message,
  clearConvo: () => void,
  botInfo: Bot['info']
) {
  clearConvo()
  return message.reply(`${botInfo.name}'s conversation history has been erased`)
}
