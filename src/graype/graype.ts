import { Message } from 'discord.js'
import { Bot } from '../core/bot'
import { stories } from '../core/services/stories'
import { delay } from '../core/utils/delay'

export class Graype extends Bot {
  isOn = true
  validCommands = ['!story', '!end', '!reset', '!on', '!off']

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

    if (this.isOn) {
      stories.onWord(message)
    }
  }

  protected override async onCommand(message: Message) {
    const [commandName, ...args] = message.cleanContent.trim().split(' ')
    message.channel.sendTyping()

    if (commandName === '!story') {
      return stories.display(message)
    }

    if (commandName === '!end') {
      return stories.end(message)
    }

    if (commandName === '!reset') {
      return stories.reset(message)
    }

    if (commandName === '!on') {
      this.isOn = true
      return
    }

    if (commandName === '!off') {
      this.isOn = false
      return
    }
  }
}

export const graype = new Graype()
