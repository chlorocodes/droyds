import { Message } from 'discord.js'
import { complimenter } from '../../core/services/complimenter'

const greetings = ['Yo', 'Hey', 'Sup']

export async function compliment(message: Message) {
  const complimentee = message.mentions?.members?.at(0) ?? message.author
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const compliment = await complimenter.compliment()

  if (complimentee.id === message.author.id) {
    return message.channel.send(compliment)
  }

  const formattedCompliment = `${greeting} <@${complimentee.id}> – ${
    compliment[0].toLowerCase() + compliment.slice(1)
  }`

  message.channel.send(formattedCompliment)
}
