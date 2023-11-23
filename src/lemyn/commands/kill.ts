import { Message } from 'discord.js'

export async function kill(message: Message) {
  if (
    message.author.id !== '1031073515174113281' &&
    message.author.id !== process.env.CHLORO_USER_ID
  ) {
    return
  }

  await message.reply('fuck you :middle_finger:')
  await message.guild?.leave()
}
