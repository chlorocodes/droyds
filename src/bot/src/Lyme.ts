import { Client, Message } from 'discord.js'
import { intents } from './config/intents'
import { BotInfo, botInfo } from './config/bot-info'
import type { Command } from './types/util'

const isProd = process.env.NODE_ENV === 'production'

interface Settings {
  assetsPath: string
  commands?: Command[]
}

export class Lyme {
  private client: Client
  private botInfo: BotInfo
  private commands: Command[]
  private assetsPath: string

  constructor(settings: Settings) {
    this.client = new Client({ intents })
    this.botInfo = botInfo
    this.assetsPath = settings.assetsPath
    this.commands = settings.commands ?? []
  }

  run() {
    this.client.once('ready', this.onReady)
    this.client.on('messageCreate', isProd ? this.onMessage : this.debug)
    this.client.login(process.env.DISCORD_TOKEN as string)
  }

  addCommands(commands: Command[]) {
    this.commands.push(...commands)
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
    console.log(message.content)
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
