import { Message } from 'discord.js'
import { roaster } from '../../roaster'
import { botInfo } from '../config/bot-info'
import { complimenter } from '../../complimenter'

const greetings = ['Yo', 'Hey', 'Sup']

export async function roast(message: Message) {
  const victim = message.mentions?.members?.at(0) ?? message.author
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]

  let response: string

  if (victim.id === botInfo.adminId) {
    response = await complimenter.compliment()
  } else {
    response = await roaster.roast()
  }

  if (victim.id === message.author.id) {
    return message.channel.send(response)
  }

  const formattedInsult = `${greeting} <@${victim.id}> – ${
    response[0].toLowerCase() + response.slice(1)
  }`

  message.channel.send(formattedInsult)
}
