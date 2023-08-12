import { GuildMember, Message } from 'discord.js'
import { botInfo } from '../config/bot-info'

export async function abuse(message: Message) {
  if (message.author.id !== botInfo.adminId) {
    message.reply('Only chloro is allowed to abuse people :laughing:')
    return
  }

  try {
    const victim = message.mentions.members?.at(0) as GuildMember
    const oldNickname = victim.nickname ?? victim.user.username
    const [, , ...words] = message.content.split(' ')
    const newNickname = words.join(' ')
    await victim?.setNickname(newNickname)
    message.reply(`I have renamed ${oldNickname} to ${newNickname}`)
  } catch (error) {
    message.reply("I don't have permission to rename them :(")
  }
}
