import { Message } from 'discord.js'

export async function avatar(message: Message) {
  const user = message.mentions?.members?.at(0) ?? message.author
  const avatarUrl = user.displayAvatarURL() + '?size=512'
  await message.channel.send({
    files: [{ attachment: avatarUrl }]
  })
}
