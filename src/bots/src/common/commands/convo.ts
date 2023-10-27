import { APIEmbed, Message } from 'discord.js'
import type { ChatCompletionRequestMessage } from 'openai'
import { Bot } from '../bot.js'

export async function convo(
  message: Message,
  conversation: ChatCompletionRequestMessage[],
  botInfo: Bot['settings']
) {
  const messageEmbed = createEmbed(botInfo, conversation)
  return message.channel.send({ embeds: [messageEmbed] })
}

function createEmbed(
  botInfo: Bot['settings'],
  conversation: ChatCompletionRequestMessage[]
) {
  const embed: APIEmbed = {
    title: `Conversation History (${botInfo.name})`,
    description: 'These are the last 10 messages from the conversation',
    color: botInfo.color,
    fields: conversation.map((message) => ({
      name: (message.name as string) ?? botInfo.name,
      value: message.content as string
    }))
  }
  return embed
}
