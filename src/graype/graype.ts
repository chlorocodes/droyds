import { Message } from 'discord.js'
import { Bot } from '../core/bot'
import { stories } from '../core/services/stories'
import { delay } from '../core/utils/delay'

export class Graype extends Bot {
  validCommands = ['!story']

  constructor() {
    super({
      token: process.env.GRAYPE_TOKEN as string,
      settings: {
        name: 'Graype',
        color: 0x9266cc,
        isChatEnabled: false,
        id: process.env.GRAYPE_USER_ID as string,
        roleId: process.env.GRAYPE_ROLE_ID as string
      }
    })
  }

  protected override async onMessage(message: Message) {
    if (
      message.author.bot ||
      message.channel.id !== process.env.ONE_WORD_STORY_CHANNEL_ID
    ) {
      return
    }

    if (
      this.validCommands.some((command) => command === message.cleanContent)
    ) {
      this.onCommand(message)
      return
    }

    const word = message.content

    if (!stories.isValidWord(word)) {
      message.delete()
      const reply = await message.channel.send('Please use 1 word')
      await delay()
      reply.delete()
      return
    }

    message.react('✅')
    stories.addWord(word, message.author)

    const terminators = ['.', '?', '!']
    if (terminators.includes(word.slice(-1))) {
      const embed = stories.displayStory()
      message.channel.send({ embeds: [embed] })
    }
  }

  protected override onCommand(message: Message) {
    message.channel.sendTyping()
    const [commandName, ...args] = message.cleanContent.trim().split(' ')

    if (commandName === '!story') {
      const embed = stories.displayStory()
      return message.channel.send({ embeds: [embed] })
    }
  }
}

export const graype = new Graype()
