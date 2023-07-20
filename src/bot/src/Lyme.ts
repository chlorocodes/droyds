import { Client, Message } from 'discord.js'
import { intents } from './config/intents'
import { BotInfo, botInfo } from './config/bot-info'
import { abuse, translate, fact, simple } from './commands'
import type { Command, NormalizedCommands } from './types/util'

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

  private onMessage = (message: Message) => {
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
    if (message.channel.id !== this.botInfo.channelId) {
      message.reply(
        `If you would like to talk to me, please head over to <#${this.botInfo.channelId}> and ask me anything :blush:`
      )
    }
  }

  private debug = async (message: Message) => {
    console.log(message)
  }
}
