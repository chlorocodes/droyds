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

  /**
   * Sets up all the event handlers for the bot and logs in to get started
   */
  run() {
    this.client.once('ready', this.onReady)
    this.client.on('messageCreate', isProd ? this.onMessage : this.debug)
    this.client.login(process.env.DISCORD_TOKEN as string)
  }

  /**
   * Registers all the simple !commands which will result in a reply with some text or an image.
   * Aliases are also registered as commands.
   */
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

  /**
   * Handler that runs once the bot has finished logging in
   */
  private onReady = (c: Client<true>) => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
  }

  /**
   * Handler for all messages received in DMs, channels, etc.
   *
   * There are 3 scenarios that result in interaction:
   * 1. The message starts with a "!" (this means that it is a special Lyme command)
   * 2. The message is an attempt at chatting with the bot itself
   * 3. Miscellaneous behavior that was added arbitrarily (such as replying to "Good morning" messages from Neko)
   */
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

  /**
   * Handles all custom !commands like "!translate" as well as simple commands
   * that had been registered when starting the bot which return simple text and image responses
   * like !cringidantes, !wat, etc.
   */
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

  /**
   * Responds to the user by querying the OpenAI API given the following 2 rules:
   *
   * 1. The user must be messaging within the #lyme channel
   * 2. The user must perform one of the following actions:
   *    - Mentions the bot
   *    - Mentions the bot's role
   *    - Replies to one of the bot's messages
   *
   * The last 10 chat messages in the conversation are held in memory so that the bot retains some context.
   */
  private async handleBotDiscussion(message: Message) {
    if (message.channel.id !== this.botInfo.channelId) {
      message.reply(
        `If you would like to talk to me, please head over to <#${this.botInfo.channelId}> and ask me anything :blush:`
      )
    }
  }

  /**
   * Helper method that only runs in development to debug random issues.
   */
  private debug = async (message: Message) => {
    console.log(message)
  }
}
