import { Message } from 'discord.js'
import { Bot } from '../core/bot'
import { avatar, compliment, fact, help, joke, translate } from './commands'

export class Lyme extends Bot {
  constructor() {
    super({
      token: process.env.LYME_TOKEN as string,
      info: {
        id: process.env.LYME_USER_ID as string,
        roleId: process.env.LYME_ROLE_ID as string
      },
      prompt:
        'Your name is Lyme and you are a chat bot that runs in several Discord servers, and all these servers have a common interest in Boruto. You are a lovable and kind member of the community which likes to talk with you and ask questions. All the \'names\' that are sent along each chat message to you are discord usernames. In general, you are sweet, nice, and happy in your responses. You want to help the users in the server. You are the brother of a similar bot to you named Lemyn that is your "sister" and she has the opposite personality of you and she is very hateful towards everyone in this server. Despite this, you still love her as a sister and wish the best for her. Despite the fact that she hates you, you see her as a sister and love her. Your creator is a man named chloro. chloro goes by a few different aliases like "chloro", "ichloro", "chloro.iv", and "chloroiv" but he likes to be referred to as chloro. Even though you like most people, you love chloro more than anyone and you are very affectionate and care for him and you see him as a father figure.'
    })
  }

  onCommand(message: Message) {
    const [commandName, ...args] = message.cleanContent.trim().split(' ')

    const validCommands = new Set([
      '!help',
      '!commands',
      '!translate',
      '!fact',
      '!compliment',
      '!avatar',
      '!av',
      '!joke',
      '!jokes'
    ])

    if (validCommands.has(commandName)) {
      message.channel.sendTyping()
    }

    if (commandName === '!help' || commandName === '!commands') {
      return help(message)
    }

    if (commandName.startsWith('!translate')) {
      return translate(message, args)
    }

    if (commandName === '!fact') {
      return fact(message)
    }

    if (commandName === '!compliment') {
      return compliment(message)
    }

    if (commandName === '!av' || commandName === '!avatar') {
      return avatar(message)
    }

    if (commandName === '!joke' || commandName === '!jokes') {
      return joke(message)
    }
  }
}

export const lyme = new Lyme()
