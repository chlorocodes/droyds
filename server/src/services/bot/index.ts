import { join } from 'node:path'
import { Client, Message, TextChannel } from 'discord.js'
import { intents } from './config/intents'
import { BotInfo, botInfo } from './config/bot-info'
import { abuse, translate, fact, simple, help } from './commands'
import type { Command, NormalizedCommands } from './types/util'
import { chatService } from '../openai'
import { apiNinjasService } from '../api-ninjas'

const isProd = process.env.NODE_ENV === 'production'
const ONE_DAY = 1000 * 60 * 60 * 24

interface Options {
  assetsPath: string
  commands?: Command[]
}

export class Lyme {
  private client: Client
  private botInfo: BotInfo
  private assetsPath: string
  private commands: NormalizedCommands
  private intervals: Record<string, NodeJS.Timer>

  constructor(settings: Options) {
    this.client = new Client({ intents })
    this.botInfo = botInfo
    this.assetsPath = settings.assetsPath
    this.commands = {}
    this.intervals = {}
  }

  start() {
    this.client = new Client({ intents })
    this.setupEventListeners()
    this.setupIntervals()
    this.client.login(process.env.DISCORD_TOKEN as string)
  }

  stop() {
    this.client.destroy()
  }

  restart() {
    this.stop()
    this.start()
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

  private setupEventListeners() {
    this.client.once('ready', this.onReady)
    this.client.on('messageCreate', isProd ? this.onMessage : this.debug)
  }

  private setupIntervals() {
    this.intervals.factOfTheDay = setInterval(this.factOfTheDay, ONE_DAY)
  }

  private onReady = (c: Client<true>) => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
  }

  private onMessage = async (message: Message) => {
    if (message.author.bot) {
      return
    }

    if (message.content.trim().startsWith('!')) {
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
    const [commandName, ...args] = message.cleanContent.trim().split(' ')

    if (this.commands[commandName]) {
      message.channel.sendTyping()
    }

    switch (commandName) {
      case '!help':
        return help(message)

      case '!translate':
        return translate(message, args)

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
      return message.reply(
        `If you would like to talk to me, please head over to <#${this.botInfo.channelId}> and ask me anything :blush:`
      )
    }

    const user = message.author.username
    const question = message.cleanContent
    const response = await chatService.ask({ user, question })

    message.reply(response ?? 'Unabled to generate a response')
  }

  private async factOfTheDay() {
    const channelId = process.env.DISCORD_BOT_SALOON_CHANNEL_ID as string
    const saloon = (await this.client.channels.cache.get(
      channelId
    )) as TextChannel
    const [fact] = await apiNinjasService.getFacts(1)
    saloon.send(`Fact of the day: ${fact}`)
  }

  private debug = (message: Message) => {
    console.log(message)
    if (message.channel.id === this.botInfo.debugChannelId) {
      this.onMessage(message)
    }
  }
}

export const lyme = new Lyme({
  assetsPath: join(__dirname, '..', '..', 'assets')
})
