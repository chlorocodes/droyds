import { APIEmbed, Message } from 'discord.js'
import { wingman } from '../../core/services/pickup-lines'

const greetings = ['Yo', 'Hey', 'Sup', 'Hi']

export async function pickup(message: Message) {
  if (message.content.startsWith('!pickup~')) {
    return multiPickup(message)
  }

  const victim = message.mentions?.members?.at(0) ?? message.author
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const [pickupLine] = await wingman.getPickupLines()

  if (victim.id === message.author.id) {
    return message.channel.send(pickupLine)
  }

  const formattedPickupLine = `${greeting} <@${victim.id}> – ${
    pickupLine[0].toLowerCase() + pickupLine.slice(1)
  }`

  message.channel.send(formattedPickupLine)
}

async function multiPickup(message: Message) {
  const suffix = message.content.split('~')[1]
  const count = Number(suffix.split(' ')[0])
  const victim =
    message.mentions.members?.at(0)?.displayName ??
    suffix.split(' ')[1] ??
    message.author.displayName

  if (!count || Number.isNaN(count)) {
    return message.reply('Invalid usage')
  }

  const pickupLineLimit =
    message.author.id === process.env.CHLORO_USER_ID ? 100 : 10

  if (count > pickupLineLimit) {
    return message.reply(
      `You can only generate a maximum of ${pickupLineLimit} compliments at a time`
    )
  }

  const pickupLines = await wingman.getPickupLines(count)
  const messageEmbed = createEmbed(pickupLines, victim)
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
