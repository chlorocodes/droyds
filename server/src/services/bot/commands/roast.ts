import { Message } from 'discord.js'
import { roaster } from '../../roaster'
import { botInfo } from '../config/bot-info'

const greetings = ['Yo', 'Hey', 'Sup']

export async function roast(message: Message) {
  const victim = message.mentions?.members?.at(0) ?? message.author

  if (victim.id === botInfo.id) {
    return message.reply('no')
  }

  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const insult = await roaster.roast()

  if (victim.id === message.author.id) {
    return message.channel.send(insult)
  }

  const formattedInsult = `${greeting} <@${victim.id}> – ${
    insult[0].toLowerCase() + insult.slice(1)
  }`

  message.channel.send(formattedInsult)
}
