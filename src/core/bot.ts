import { Client, GatewayIntentBits, Message } from 'discord.js'
import { ChatService } from './services/openai'
import { convo } from './commands/convo'
import { clearConvo } from './commands/clearConvo'

interface Options {
  token: string
  prompt?: string
  settings: {
    id: string
    name: string
    isChatEnabled: boolean
    color: number
    roleId: string
    channelId?: string
  }
}

export class Bot {
  settings: Options['settings']
  private intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
  protected client = new Client({
    intents: this.intents
  })
  private token: string
  private chat: ChatService
  private isRestricted = true

  constructor({ settings, token, prompt = '' }: Options) {
    const channelId = process.env.LEMYN_LYME_CHANNEL_ID as string
    this.settings = { ...settings, channelId }
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
    if (
      message.author.bot ||
      (process.env.NODE_ENV === 'development' &&
        message.guild?.id !== process.env.DEBUG_SERVER_ID)
    ) {
      return
    }

    if (message.content.startsWith('!')) {
      this.onCommand(message)
      return
    }

    if (message.content.startsWith('~')) {
      this.onAdminCommand(message)
      return
    }

    const isReplyToBot = message.mentions.repliedUser?.id === this.settings.id
    const isBotMention = message.mentions.users.get(this.settings.id)
    const isRoleMention = message.mentions.roles.get(this.settings.roleId)

    if (
      this.settings.isChatEnabled &&
      (isReplyToBot || isBotMention || isRoleMention)
    ) {
      return this.onChat(message)
    }
  }

  protected async onChat(message: Message) {
    const shibuyaServerId = process.env.SHIBUYA_SERVER_ID as string
    if (
      this.isRestricted &&
      message.guild?.id === shibuyaServerId &&
      message.channel.id !== this.settings.channelId
    ) {
      return
    }

    await message.channel.sendTyping()

    const user = message.author.username
    const question = message.cleanContent
    const response = await this.chat.ask({ user, question })

    message.reply(response ?? 'Unabled to generate a response')
  }

  protected onAdminCommand(message: Message) {
    const [commandName] = message.cleanContent.trim().split(' ')

    if (commandName === '~restrict') {
      this.isRestricted = true
      return message.reply('Cytrus bot restrictions have been enabled.')
    }

    if (commandName === '~free' || commandName === '~unrestrict') {
      this.isRestricted = false
      return message.reply('Cytrus bot restrictions have been disabled.')
    }
  }

  protected onCommand(message: Message): unknown {
    const [commandName, ...args] = message.cleanContent.trim().split(' ')
    const validCommands = new Set(['!convo', '!clearConvo'])

    if (
      validCommands.has(commandName) &&
      args.join(' ').includes(this.settings.name)
    ) {
      message.channel.sendTyping()
    }

    if (
      commandName.startsWith('!convo') &&
      args[0].toLowerCase().includes(this.settings.name.toLowerCase())
    ) {
      return convo(message, this.getConversation(), this.settings)
    }

    if (
      commandName.toLowerCase().startsWith('!clearconvo') &&
      args[0].toLowerCase().includes(this.settings.name.toLowerCase())
    ) {
      return clearConvo(
        message,
        this.clearConversation.bind(this),
        this.settings
      )
    }
  }
}
