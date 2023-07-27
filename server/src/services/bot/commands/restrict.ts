import { Message } from 'discord.js'
import { botInfo } from '../config/bot-info'

export async function restrict(message: Message, restrictedUsers: string[]) {
  if (!message.mentions.repliedUser) {
    return
  }

  if (message.author.id !== botInfo.adminId) {
    return message.reply('Only a bot admin can restrict users')
  }

  if (message.mentions.repliedUser.id === botInfo.adminId) {
    return message.reply("Lmao I'm not going to restrict Chloro :laughing:")
  }

  const userToRestrict = message.mentions.repliedUser
  restrictedUsers.push(userToRestrict.id)

  message.reply(
    `${userToRestrict} has been added to the restricted list. This user will now have much more limited access to Lyme interactions until the restrictions have been lifted.`
  )
}
