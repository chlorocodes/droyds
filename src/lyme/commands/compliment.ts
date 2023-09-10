import { APIEmbed, Message } from 'discord.js'
import { complimenter } from '../../core/services/complimenter'

const greetings = ['Yo', 'Hey', 'Sup', 'Hi']

export async function compliment(message: Message) {
  if (message.content.startsWith('!compliment~')) {
    return multiCompliment(message)
  }

  const complimentee = message.mentions?.members?.at(0) ?? message.author
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const [compliment] = await complimenter.getCompliments()

  if (complimentee.id === message.author.id) {
    return message.channel.send(compliment)
  }

  const formattedCompliment = `${greeting} <@${complimentee.id}> – ${
    compliment[0].toLowerCase() + compliment.slice(1)
  }`

  message.channel.send(formattedCompliment)
}

async function multiCompliment(message: Message) {
  const suffix = message.content.split('~')[1]
  const count = Number(suffix.split(' ')[0])
  const complimentee =
    message.mentions.members?.at(0)?.displayName ??
    suffix.split(' ')[1] ??
    message.author.displayName

  if (!count || Number.isNaN(count)) {
    return message.reply('Invalid usage')
  }

  const complimentLimit =
    message.author.id === process.env.CHLORO_USER_ID ? 100 : 10

  if (count > complimentLimit) {
    return message.reply(
      `You can only generate a maximum of ${complimentLimit} compliments at a time`
    )
  }

  const compliments = await complimenter.getCompliments(count)
  const messageEmbed = createEmbed(compliments, complimentee)
  message.channel.send({ embeds: [messageEmbed] })
}

function createEmbed(compliments: string[], user: string) {
  const embed: APIEmbed = {
    title: user,
    color: 0xa3f55c,
    fields: compliments.map((compliment) => ({
      name: '',
      value: compliment
    }))
  }
  return embed
}
