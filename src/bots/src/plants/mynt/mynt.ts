import { Message } from 'discord.js'
import { Bot } from '../../common/bot.js'
import { obliterate } from './commands/obliterate.js'

export class Mynt extends Bot {
  constructor() {
    super({
      token: process.env.MYNT_TOKEN as string,
      settings: {
        name: 'Mynt',
        color: 0xacde59,
        isChatEnabled: false,
        id: process.env.MYNT_USER_ID as string,
        roleId: process.env.MYNT_ROLE_ID as string,
        debugChannelId: process.env.DEBUG_MYNT_CHANNEL_ID as string
      }
    })
  }

  onCommand(message: Message) {
    super.onCommand(message)

    const [commandName] = message.cleanContent.trim().split(' ')

    if (commandName === '!obliterate') {
      return obliterate(message)
    }
  }
}
