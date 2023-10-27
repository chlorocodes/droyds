import { Client, Message, TextChannel } from 'discord.js'

export function send(message: Message, client: Client) {
  const [, channelId, ...args] = message.content.trim().split(' ')
  const content = args.join(' ')
  const channel = client.channels.cache.get(channelId) as TextChannel
  if (channel) {
    message.delete()
    channel.send(content)
  }
}
