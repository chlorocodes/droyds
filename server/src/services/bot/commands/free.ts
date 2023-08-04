import { Message } from 'discord.js'
import { botInfo } from '../config/bot-info'

export async function free(message: Message, restrictedUsers: string[]) {
  if (message.author.id !== botInfo.adminId) {
    return message.reply('Only a bot admin can free users')
  }

  const userToFree = message.mentions?.members?.at(0)

  if (!userToFree) {
    return
  }

  const index = restrictedUsers.indexOf(userToFree.id)

  if (index !== -1) {
    restrictedUsers.splice(index, 1)
  }

  message.reply(
    `${userToFree} is now free. Please be more responsible from now on and don't end up back on the list`
  )
}
