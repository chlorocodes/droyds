import { join } from 'node:path'
import { Client, Message, TextChannel } from 'discord.js'
import { intents } from './config/intents'
import { BotInfo, botInfo } from './config/bot-info'
import type { Command, NormalizedCommands } from './types/util'
import { chatService } from '../openai'
import { apiNinjasService } from '../api-ninjas'
import {
  abuse,
  translate,
  fact,
  help,
  archive,
  roast,
  mock,
  restrict,
  free,
  snitch,
  avatar,
  compliment,
  joke
} from './commands'

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
  private simpleCommands: NormalizedCommands
  private restrictedUsers: string[]
  private intervals: Record<string, NodeJS.Timer>
  private isRestricted = false

  constructor(settings: Options) {
    this.client = new Client({ intents })
    this.botInfo = botInfo
    this.assetsPath = settings.assetsPath
    this.simpleCommands = {}
    this.restrictedUsers = []
    this.intervals = {}
  }

  async start() {
    this.client = new Client({ intents })
    this.setupEventListeners()
    this.setupIntervals()
    await this.client.login(process.env.DISCORD_TOKEN as string)
  }

  async stop() {
    await this.client.destroy()
  }

  async restart() {
    await this.stop()
    await this.start()
  }

  private restrict() {
    this.isRestricted = true
  }

  private free() {
    this.isRestricted = false
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
    console.log(message)

    if (message.author.bot) {
      return
    }

    if (
      message.content.trim().startsWith('!') ||
      message.content.trim().startsWith('~')
    ) {
      return this.onCommand(message)
    }

    const isReplyToBot = message.mentions.repliedUser?.id === this.botInfo.id
    const isBotMention = message.mentions.users.get(this.botInfo.id)
    const isRoleMention = message.mentions.roles.get(this.botInfo.roleId)

    if (isBotMention || isRoleMention || isReplyToBot) {
      this.handleBotDiscussion(message)
    }

    this.handleSpecialInteractions(message)
  }

  private onCommand = async (message: Message) => {
    const [commandName, ...args] = message.cleanContent.trim().split(' ')

    const validCommands = new Set([
      ...Object.keys(this.simpleCommands),
      '!help',
      '!commands',
      '!translate',
      '!abuse',
      '!fact',
      '!compliment',
      '!roast',
      '!mock',
      '!snitch',
      '!archive',
      '!avatar',
      '!av',
      '!joke',
      '!jokes',
      '~restrict',
      '~free'
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

    if (commandName === '!abuse') {
      return abuse(message)
    }

    if (commandName === '!fact') {
      return fact(message)
    }

    if (commandName === '!compliment') {
      return compliment(message)
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

    if (commandName === '!restrict') {
      return restrict(message, this.restrictedUsers)
    }

    if (commandName === '!free' || commandName === '!unrestrict') {
      return free(message, this.restrictedUsers)
    }

    if (commandName === '!archive') {
      return archive(message, this.client.channels)
    }

    if (commandName === '!av' || commandName === '!avatar') {
      return avatar(message)
    }

    if (commandName === '!joke' || commandName === '!jokes') {
      return joke(message)
    }

    if (commandName === '~restrict') {
      return this.restrict()
    }

    if (commandName === '~free') {
      return this.free()
    }
  }

  private async handleBotDiscussion(message: Message) {
    if (this.isRestricted && message.channel.id !== this.botInfo.channelId) {
      return
    }

    await message.channel.sendTyping()

    const user = message.author.username
    const question = message.cleanContent
    const response = await chatService.ask({ user, question })

    message.reply(response ?? 'Unabled to generate a response')
  }

  private async handleSpecialInteractions(message: Message) {
    if (
      message.author.username === '.zselect' &&
      message.content.toLowerCase().startsWith('good morning')
    ) {
      message.reply('Good morning Neko! :blush')
    }
  }

  private factOfTheDay = async () => {
    const channelId = this.botInfo.saloonChannelId
    const saloon = (await this.client.channels.cache.get(
      channelId
    )) as TextChannel

    const [fact] = await apiNinjasService.getFacts(1)
    saloon.send(`Fact of the day: ${fact}`)
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
