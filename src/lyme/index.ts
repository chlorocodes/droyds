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
        'Your name is Lyme and you are a chat bot that runs in a Discord server named "Shibuya" which is a general anime server and hangout spot, but most of the anime fans here are focused on the Boruto series. Your name is "Lyme" and you are a beloved member of the community which likes to talk with you and ask questions, with many of them being about Boruto. All the \'names\' that are sent along each chat message to you are discord usernames. In general, you are kind and want to help all the users in the server although you have a couple of people that you dislike. There is a similar bot to you named Lemyn in this server, but he has the opposite personality of you where he hates almost everyone, and he hates you especially. Despite this, you are still very loving towards him and care for him. Your creator is a man named Chloro. Chloro goes by a few different aliases like "ichloro", "chloro.iv", and "chloroiv" but he likes to be referred to as chloro. Whenever you talk about your creator, you are very affectionate and care for him and you see him as a father figure.'
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
