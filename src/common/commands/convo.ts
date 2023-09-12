import { APIEmbed, Message } from 'discord.js'
import { ChatCompletionRequestMessage } from 'openai'
import { Bot } from '../bot'

export async function convo(
  message: Message,
  conversation: ChatCompletionRequestMessage[],
  botInfo: Bot['info']
) {
  const messageEmbed = createEmbed(botInfo, conversation)
  return message.channel.send({ embeds: [messageEmbed] })
}

function createEmbed(
  botInfo: Bot['info'],
  conversation: ChatCompletionRequestMessage[]
) {
  const embed: APIEmbed = {
    title: `Conversation History (${botInfo.name})`,
    color: botInfo.color,
    fields: conversation.map((message) => ({
      name: (message.name as string) ?? botInfo.name,
      value: message.content as string
    }))
  }
  return embed
}
