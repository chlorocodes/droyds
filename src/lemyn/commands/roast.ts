import { Message } from 'discord.js'
import { roaster } from '../../common/services/roaster'
import { lemyn } from '../lemyn'

const greetings = ['Yo', 'Hey', 'Sup']

export async function roast(message: Message) {
  const victim = message.mentions?.members?.at(0) ?? message.author

  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const insult = await roaster.roast()

  if (victim.id === message.author.id) {
    return message.channel.send(insult)
  }

  const formattedInsult = `${greeting} <@${victim.id}> – ${
    insult[0].toLowerCase() + insult.slice(1)
  }`

  lemyn.addToConversation(formattedInsult)
  message.channel.send(formattedInsult)
}
