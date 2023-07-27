import { Message } from 'discord.js'
import { botInfo } from '../config/bot-info'

export async function free(message: Message, restrictedUsers: string[]) {
  if (!message.mentions.repliedUser) {
    return
  }

  if (message.author.id !== botInfo.adminId) {
    return message.reply('Only a bot admin can remove restrictions')
  }

  const userToFree = message.mentions.repliedUser
  const index = restrictedUsers.indexOf(userToFree.id)

  if (index !== -1) {
    restrictedUsers.splice(index, 1)
  }

  message.reply(
    `${userToFree} is now free. Please be more responsible from now on and don't end up back on the list`
  )
}
