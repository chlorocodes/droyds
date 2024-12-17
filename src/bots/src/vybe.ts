import { Message } from 'discord.js'
import { Bot } from './common/bot'
import { translate } from './common/commands/index'

export class Vybe extends Bot {
  constructor() {
    super({
      token: process.env.VYBE_TOKEN as string,
      settings: {
        name: 'Vybe',
        color: 0x8cdd50,
        isChatEnabled: false,
        id: process.env.VYBE_USER_ID as string,
        debugChannelId: process.env.VYBE_DEBUG_CHANNEL_ID as string
      }
    })
  }

  onCommand(message: Message<true>) {
    super.onCommand(message)

    const [commandName, ...args] = message.cleanContent.trim().split(' ')
    const validCommands = new Set(['!translate'])

    if (validCommands.has(commandName)) {
      message.channel.sendTyping()
    }

    if (commandName.startsWith('!translate')) {
      return translate(message, args)
    }
  }
}
