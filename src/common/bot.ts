import { Client, Message } from 'discord.js'
import { intents } from './intents'
import { ChatService } from './services/openai'
import { convo } from './commands/convo'
import { clearConvo } from './commands/clearConvo'

interface Options {
  token: string
  prompt: string
  info: {
    id: string
    name: string
    color: number
    roleId: string
    channelId?: string
  }
}

export class Bot {
  info: Options['info']
  protected client = new Client({ intents })
  private token: string
  private chat: ChatService
  private isRestricted = false

  constructor({ info, token, prompt }: Options) {
    const channelId = process.env.LEMYN_LYME_CHANNEL_ID as string
    this.info = { ...info, channelId }
    this.token = token
    this.chat = new ChatService({ prompt })
  }

  async start() {
    this.client = new Client({ intents })
    this.setupEventListeners()
    this.setupIntervals()
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
      name: this.info.name,
      content: message
    })
  }

  getConversation() {
    return this.chat.getConversation(this.info.name)
  }

  clearConversation() {
    this.chat.clearConversation()
  }

  protected setupEventListeners() {
    this.client.once('ready', this.onReady)
    this.client.on('messageCreate', this.onMessage)
  }

  protected setupIntervals() {}

  protected onReady = (client: Client<true>) => {
    console.log(`Ready! Logged in as ${client.user.tag}`)
  }

  protected onMessage = (message: Message) => {
    console.log(message)

    if (
      message.author.bot ||
      (process.env.NODE_ENV === 'development' &&
        message.channel.id !== process.env.DEBUG_CHANNEL_ID)
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

    const isReplyToBot = message.mentions.repliedUser?.id === this.info.id
    const isBotMention = message.mentions.users.get(this.info.id)
    const isRoleMention = message.mentions.roles.get(this.info.roleId)

    if (isReplyToBot || isBotMention || isRoleMention) {
      return this.onChat(message)
    }
  }

  protected async onChat(message: Message) {
    if (this.isRestricted && message.channel.id !== this.info.channelId) {
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
      return
    }

    if (commandName === '~free' || commandName === '~unrestrict') {
      this.isRestricted = false
      return
    }
  }

  protected onCommand(message: Message): unknown {
    const [commandName, ...args] = message.cleanContent.trim().split(' ')
    const validCommands = new Set(['!convo', '!clearConvo'])

    if (
      validCommands.has(commandName) &&
      args.join(' ').includes(this.info.name)
    ) {
      message.channel.sendTyping()
    }

    if (
      commandName.startsWith('!convo') &&
      args[0].toLowerCase().includes(this.info.name.toLowerCase())
    ) {
      return convo(message, this.getConversation(), this.info)
    }

    if (
      commandName.toLowerCase().startsWith('!clearconvo') &&
      args[0].toLowerCase().includes(this.info.name.toLowerCase())
    ) {
      return clearConvo(message, this.clearConversation.bind(this), this.info)
    }
  }
}
