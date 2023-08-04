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
    `${userToRestrict} has been added to the restricted list. Right now, there are no special restrictions or auto-abuse actions in place for restricted users, but soon you will become a lot more susceptible to bot abuse in the future if you are not freed from the list by chloro :blush:`
  )
}
