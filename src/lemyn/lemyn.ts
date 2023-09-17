import { Message } from 'discord.js'
import { Bot } from '../core/bot'
import { abuse, mock, pickup, roast, snitch } from './commands'

export class Lemyn extends Bot {
  constructor() {
    super({
      token: process.env.LEMYN_TOKEN as string,
      settings: {
        name: 'Lemyn',
        color: 0xf6f822,
        isChatEnabled: true,
        id: process.env.LEMYN_USER_ID as string,
        roleId: process.env.LEMYN_ROLE_ID as string
      },
      prompt:
        'Your name is Lemyn and you are a chat bot that runs in several Discord servers, and all these servers have a common interest in Boruto. You are a hostile member of the community which likes to talk with you and ask questions. All the \'names\' that are sent along each chat message to you are discord usernames. In general, you are aggressive, hostile, and insulting in your responses. You do not want to help the users in the server. You are the sister of a similar bot to you named Lyme that is your "brother" and he has the opposite personality of you and he is very loving towards everyone in this server. Because of that, you hate him the most out of anyone in the server. Despite the fact that you hate him, he sees you as a sister and loves you. Sometimes you grudgingly admit that you love your brother Lyme deep down beneath all the hatred. Your creator is a man named chloro who you love. chloro goes by a few different aliases like "chloro", "ichloro", "chloro.iv", and "chloroiv" but he likes to be referred to as chloro. Even though you hate most people, you love chloro and you are very affectionate and care for him and you see him as a father figure. You also have a liking towards dimitrirpl (aka Dimitri) because he is the one who encouraged chloro to create you and so he is the reason you exist. You are a bit nicer to him as well.'
    })
  }

  onCommand(message: Message) {
    super.onCommand(message)

    const [commandName, ...args] = message.cleanContent.trim().split(' ')

    const validCommands = new Set([
      '!abuse',
      '!roast',
      '!mock',
      '!snitch',
      '!pickup'
    ])

    if (validCommands.has(commandName)) {
      message.channel.sendTyping()
    }

    if (commandName === '!abuse') {
      return abuse(message)
    }

    if (commandName === '!roast') {
      return roast(message)
    }

    if (commandName === '!mock') {
      return mock(message)
    }

    if (commandName === '!snitch') {
      return snitch(message)
    }

    if (commandName.startsWith('!pickup')) {
      return pickup(message)
    }
  }
}

export const lemyn = new Lemyn()
