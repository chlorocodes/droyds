import { join } from 'node:path'
import { Client, Message } from 'discord.js'
import { intents } from './config/intents'
import { BotInfo, botInfo } from './config/bot-info'
import { abuse, translate, fact, simple } from './commands'
import type { Command, NormalizedCommands } from './types/util'
import { chatService } from '../openai'

const isProd = process.env.NODE_ENV === 'production'

interface Options {
  assetsPath: string
  commands?: Command[]
}

export class Lyme {
  private client: Client
  private botInfo: BotInfo
  private commands: NormalizedCommands
  private assetsPath: string

  constructor(settings: Options) {
    this.client = new Client({ intents })
    this.botInfo = botInfo
    this.assetsPath = settings.assetsPath
    this.commands = {}
  }

  run() {
    this.client.once('ready', this.onReady)
    this.client.on('messageCreate', isProd ? this.onMessage : this.debug)
    this.client.login(process.env.DISCORD_TOKEN as string)
  }

  registerCommands(commands: Command[]) {
    const normalizedCommands: NormalizedCommands = {}
    commands.forEach(({ name, response, responseType, aliases }) => {
      const commandSetting = { response, responseType }
      normalizedCommands[name] = commandSetting
      aliases.forEach(({ alias }) => {
        normalizedCommands[alias] = commandSetting
      })
    })
    this.commands = normalizedCommands
  }

  private onReady = (c: Client<true>) => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
  }

  private onMessage = async (message: Message) => {
    if (message.author.bot) {
      return
    }

    if (message.content.startsWith('!')) {
      return this.onCommand(message)
    }

    const isReplyToBot = message.mentions.repliedUser?.id === this.botInfo.id
    const isBotMention = message.mentions.users.get(this.botInfo.id)
    const isRoleMention = message.mentions.roles.get(this.botInfo.roleId)

    if (isBotMention || isRoleMention || isReplyToBot) {
      this.handleBotDiscussion(message)
    }
  }

  private onCommand = async (message: Message) => {
    const commandName = message.content.trim().toLowerCase()

    if (this.commands[commandName]) {
      message.channel.sendTyping()
    }

    switch (commandName) {
      case '!translate':
        return translate(message)

      case '!abuse':
        return abuse(message)

      case '!fact':
        return fact(message)

      default:
        return simple({
          message,
          registeredCommands: this.commands,
          commandName,
          assetsPath: this.assetsPath
        })
    }
  }

  private async handleBotDiscussion(message: Message) {
    await message.channel.sendTyping()

    if (
      message.channel.id !== this.botInfo.channelId &&
      message.channel.id !== this.botInfo.debugChannelId
    ) {
      message.reply(
        `If you would like to talk to me, please head over to <#${this.botInfo.channelId}> and ask me anything :blush:`
      )
    }

    const user = message.author.username
    const question = message.cleanContent
    const response = await chatService.ask({ user, question })

    message.reply(response ?? 'Unabled to generate a response')
  }

  private debug = (message: Message) => {
    if (message.channel.id === this.botInfo.debugChannelId) {
      this.onMessage(message)
    }
  }
}

export const lyme = new Lyme({
  assetsPath: join(__dirname, '..', '..', 'assets')
})
