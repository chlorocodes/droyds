import { Client, Message } from 'discord.js'
import { intents } from './intents'
import { ChatService } from './services/openai'

interface Options {
  token: string
  prompt: string
  info: {
    id: string
    roleId: string
    channelId?: string
  }
}

export abstract class Bot {
  protected client = new Client({ intents })
  protected chat: ChatService
  protected token: string
  protected info: Options['info']
  protected isRestricted = false

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

  protected setupEventListeners() {
    this.client.once('ready', this.onReady)
    this.client.on('messageCreate', this.onMessage)
  }

  protected setupIntervals() {}

  protected onReady = (client: Client<true>) => {
    console.log(`Ready! Logged in as ${client.user.tag}`)
  }

  protected onMessage = (message: Message) => {
    if (
      message.author.bot ||
      message.channel.id !== process.env.DEBUG_CHANNEL_ID
    ) {
      return
    }

    console.log(message)

    if (message.content.startsWith('!')) {
      return this.onCommand(message)
    }

    if (message.content.startsWith('~')) {
      return this.onAdminCommand(message)
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

  protected abstract onCommand(message: Message): void
}
