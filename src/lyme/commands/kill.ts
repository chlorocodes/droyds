import { Message } from 'discord.js'

export async function kill(message: Message) {
  console.log('thisisrunning')

  if (message.author.id !== process.env.CHLORO_USER_ID) {
    return
  }

  console.log(message.author.id)
  console.log(process.env.CHLORO_USER_ID)

  await message.reply('I love you all :green_heart:')
  await message.guild?.leave()
}
