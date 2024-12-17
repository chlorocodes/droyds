import { ChatService } from '@droyds/core/services'
import { splitMessage } from '@droyds/core/utils'
import { Client, GatewayIntentBits, Message } from 'discord.js'
import { convo } from './commands/convo.js'
import { clearConvo } from './commands/clearConvo.js'
import { getDefaultHighWaterMark } from 'stream'

interface Settings {
  id: string
  name: string
  isChatEnabled: boolean
  color: number
  channelId?: string
  debugChannelId: string
  adminPrefix: string
  prefix: string
}

interface Options {
  token: string
  settings: Omit<Settings, 'prefix' | 'adminPrefix'>
  prompt?: string
}

export enum Command {
  On = 'on',
  Off = 'off'
}

export class Bot {
  settings: Options['settings']
  private intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
  protected client: Client<true> = new Client({
    intents: this.intents
  })
  private token: string
  private chat: ChatService
  private isOn: boolean = true

  constructor({ settings, token, prompt = '' }: Options) {
    const defaultSettings: Partial<Settings> = {
      prefix: '!',
      adminPrefix: '~'
    }

    this.settings = {
      ...defaultSettings,
      ...settings
    }

    this.token = token
    this.chat = new ChatService({ prompt })
  }

  async start() {
    this.client = new Client({ intents: this.intents })
    this.setupEventListeners()
    await this.client.login(this.token)
  }

  async stop() {
    await this.client.destroy()
  }

  async reset() {
    await this.stop()
    await this.start()
  }

  addToConversation(message: string) {
    this.chat.addToConversation({
      role: 'assistant',
      name: this.settings.name,
      content: message
    })
  }

  protected getConversation() {
    return this.chat.getConversation(this.settings.name)
  }

  protected clearConversation() {
    this.chat.clearConversation()
  }

  protected setupEventListeners() {
    this.client.once('ready', this.onReady.bind(this))
    this.client.on('messageCreate', this.onMessage.bind(this))
  }

  protected onReady(client: Client<true>) {
    console.log(`Ready! Logged in as ${client.user.tag}`)
  }

  protected onMessage(message: Message) {
    if (!message.inGuild) {
      return
    }

    if (
      message.author.bot ||
      (process.env.NODE_ENV === 'development' &&
        message.guild?.id !== process.env.DEBUG_SERVER_ID)
    ) {
      return
    }

    if (message.content.startsWith('!')) {
      return this.onCommand(message)
    }

    if (message.content.startsWith(this.settings.adminPrefix)) {
      return this.onAdminCommand(message)
    }

    const isReplyToBot = message.mentions.repliedUser?.id === this.settings.id
    const isBotMention = message.mentions.users.get(this.settings.id)
    const isDebugChannel = message.channel.id === this.settings.debugChannelId
    const isTalkingToBot = isReplyToBot || isBotMention

    if (isDebugChannel || (this.settings.isChatEnabled && isTalkingToBot)) {
      return this.onChat(message)
    }
  }

  protected async onChat(message: Message) {
    if (!this.isOn) {
      return
    }

    if (message.inGuild()) {
      message.channel.sendTyping()
    }

    const user = message.author.username
    const question = message.cleanContent
    const response = await this.chat.ask({ user, question })
    const messages = splitMessage(response ?? '')

    messages.forEach((msg) => {
      message.reply(msg ?? 'Unable to generate a response')
    })
  }

  protected onAdminCommand(message: Message) {
    const [commandName] = message.cleanContent.trim().split(' ')

    if (this.isAdminCmd(commandName, Command.On)) {
      this.isOn = true
      return message.reply('Droyd restrictions have been enabled.')
    }

    if (this.isAdminCmd(commandName, Command.Off)) {
      this.isOn = false
      return message.reply('Droyd restrictions have been disabled.')
    }
  }

  protected onCommand(message: Message): unknown {
    const [commandName, ...args] = message.cleanContent.trim().split(' ')
    const validCommands = new Set(['!convo', '!clearConvo'])

    if (
      validCommands.has(commandName) &&
      args.join(' ').includes(this.settings.name) &&
      message.inGuild()
    ) {
      message.channel.sendTyping()
    }

    if (
      commandName.startsWith('!convo') &&
      args[0].toLowerCase().includes(this.settings.name.toLowerCase())
    ) {
      return convo(
        message as Message<true>,
        this.getConversation(),
        this.settings
      )
    }

    if (
      commandName.toLowerCase().startsWith('!clearconvo') &&
      args[0].toLowerCase().includes(this.settings.name.toLowerCase())
    ) {
      return clearConvo(
        message as Message<true>,
        this.clearConversation.bind(this),
        this.settings
      )
    }
  }

  protected isCmd(message: string = '', command: Command) {
    const prefix = this.settings.prefix ?? '!'
    return message.startsWith(prefix + command)
  }

  protected isAdminCmd(message: string = '', command: Command) {
    const prefix = this.settings.adminPrefix ?? '~'
    return message.startsWith(prefix + command)
  }
}
