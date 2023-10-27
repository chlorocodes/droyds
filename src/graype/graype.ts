import { Message } from 'discord.js'
import { Bot } from '../core/bot'
import { oneWordStories } from '../core/services/one-word-stories'

export class Graype extends Bot {
  isOn = true
  validCommands = ['!story', '!end', '!reset', '!on', '!off']
  adminRoles = ['1024519285357416478', '1036774701046960218']

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
    const storyChannelId =
      process.env.NODE_ENV === 'development'
        ? process.env.DEBUG_STORY_CHANNEL_ID
        : process.env.ONE_WORD_STORY_CHANNEL_ID

    if (message.author.bot || message.channel.id !== storyChannelId) {
      return
    }

    if (
      this.validCommands.some((command) => command === message.cleanContent)
    ) {
      this.onCommand(message)
      return
    }

    if (this.isOn) {
      oneWordStories.onWord(message)
    }
  }

  protected override async onCommand(message: Message) {
    const [commandName, ...args] = message.cleanContent.trim().split(' ')

    if (this.validCommands.includes(commandName)) {
      message.channel.sendTyping()
    }

    if (commandName === '!story') {
      return oneWordStories.displayStory(message)
    }

    if (commandName === '!end') {
      return oneWordStories.end(message, args.join(' '))
    }

    if (commandName === '!reset') {
      return oneWordStories.reset(message)
    }

    const isAdmin =
      message.author.id === process.env.CHLORO_USER_ID ||
      this.adminRoles.some((role) => message.member?.roles.cache.has(role))

    if (isAdmin) {
      if (commandName === '!on') {
        this.isOn = true
        return message.reply(`${this.settings.name} has been enabled`)
      }

      if (commandName === '!off') {
        this.isOn = false
        return message.reply(`${this.settings.name} has been disabled`)
      }
    }
  }
}

export const graype = new Graype()
