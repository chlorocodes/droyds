import { Message } from 'discord.js'
import { botInfo } from '../config/bot-info'

export async function restrict(message: Message, restrictedUsers: string[]) {
  if (message.author.id !== botInfo.adminId) {
    return message.reply('Only a bot admin can restrict users')
  }

  const victim = message.mentions?.members?.at(0)

  if (!victim) {
    return
  }

  if (victim.id === botInfo.adminId) {
    return message.reply("Lmao I'm not going to restrict Chloro :laughing:")
  }

  restrictedUsers.push(victim.id)

  message.reply(
    `${victim} has been added to the restricted list. Right now, there are no special restrictions or auto-abuse actions in place for restricted users, but soon they will become a lot more susceptible to bot abuse in the future if they are not freed from the list by chloro :blush:`
  )
}
