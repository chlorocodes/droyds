import { join } from 'node:path'
import { NormalizedCommands } from '../lyme/types/util'
import { Client, GatewayIntentBits, Message } from 'discord.js'
import { db } from '../../database'
import { chatService } from '../../openai'
import { botInfo } from '../lyme/config/bot-info'

export interface Settings {
  id: string
  adminId: string
  saloonId: string
}

interface CommandAlias {
  id: string
  commandId: string
  alias: string
}

interface SimpleCommand {
  id: string
  name: string
  response: string
  responseType: 'text' | 'image'
  aliases: CommandAlias[]
}

export class Cytrus {
  protected simpleCommands: NormalizedCommands = {}
  protected assetsPath = join(__dirname, '..', '..', '..', 'assets')
  protected settings: Settings = {
    id: '',
    adminId: '',
    saloonId: ''
  }
  private intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
  protected client: Client

  constructor() {
    this.client = new Client({ intents: this.intents })
  }

  async registerSimpleCommands() {
    const commands = await db.command.findMany({ include: { aliases: true } })
    const normalizedCommands: NormalizedCommands = {}

    commands.forEach(({ name, response, responseType, aliases }) => {
      const commandSetting = { response, responseType }
      normalizedCommands[name] = commandSetting
      aliases.forEach(({ alias }) => {
        normalizedCommands[alias] = commandSetting
      })
    })

    this.simpleCommands = normalizedCommands
  }

  async start() {
    this.client = new Client({ intents: this.intents })
    await this.registerSimpleCommands()
    this.setupEventListeners()
    this.setupIntervals()
    await this.client.login(process.env.DISCORD_TOKEN as string)
  }

  async stop() {}

  async restart() {}

  private onReady(client: Client<true>) {
    console.log(`Ready! Logged in as ${client.user.tag}`)
  }

  private setupEventListeners() {
    this.client.once('ready', this.onReady)
    this.client.on('messageCreate', this.onMessage)
  }

  protected setupIntervals() {}

  private onMessage = async (message: Message) => {
    console.log(message)

    if (message.author.bot) {
      return
    }

    if (message.content.trim().startsWith('!')) {
      return this.onCommand(message)
    }

    const isReplyToBot = message.mentions.repliedUser?.id === botInfo.id
    const isBotMention = message.mentions.users.get(botInfo.id)
    const isRoleMention = message.mentions.roles.get(botInfo.roleId)

    if (isBotMention || isRoleMention || isReplyToBot) {
      this.handleBotDiscussion(message)
    }
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
      '!restrict',
      '!free',
      '!unrestrict',
      '!archive',
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

    return simple({
      message,
      registeredCommands: this.simpleCommands,
      commandName,
      assetsPath: this.assetsPath
    })
  }

  private async handleBotDiscussion(message: Message) {
    await message.channel.sendTyping()

    const user = message.author.username
    const question = message.cleanContent
    const response = await chatService.ask({ user, question })

    message.reply(response ?? 'Unabled to generate a response')
  }
}
