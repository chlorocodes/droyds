import { GuildMember, Message } from 'discord.js'

export async function abuse(message: Message) {
  if (message.author.id !== process.env.DISCORD_BOT_ADMIN_ID) {
    message.reply('Only chloro is allowed to abuse people :laughing:')
    return
  }

  try {
    const victim = message.mentions.members?.at(0) as GuildMember
    const oldNickname = victim.nickname ?? victim.user.username
    const [, , newNickname] = message.content.split(' ')
    await victim?.setNickname(newNickname)
    message.reply(`I have renamed ${oldNickname} to ${newNickname}`)
  } catch (error) {
    message.reply("I don't have permission to rename them :(")
  }
}
