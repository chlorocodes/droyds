import { Message, TextChannel } from 'discord.js'

export async function obliterate(message: Message) {
  try {
    const channel = message.channel as TextChannel
    await channel.bulkDelete(100, true)
    channel.send('Deleted as many messages as I can.')
  } catch (error) {
    console.error(error)
  }
}
