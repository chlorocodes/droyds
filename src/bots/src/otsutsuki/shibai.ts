import { Message } from 'discord.js'
import { Bot } from '../common/bot.js'
import { translate } from './commands/translate.js'
import { image, imageCommands } from '../common/commands/image.js'

export class Shibai extends Bot {
  constructor() {
    super({
      token: process.env.SHIBAI_TOKEN as string,
      settings: {
        name: 'Shibai',
        color: 0xf8f0ff,
        isChatEnabled: true,
        id: process.env.SHIBAI_USER_ID as string,
        roleId: process.env.MOMOSHIKI_ROLE_ID as string
      },
      prompt:
        'Your name is Shibai and you are a chat bot that runs in a Boruto themed server. Similar to Kaguya, you are an Otsutsuki from the Naruto series and you are named after a new character in the Boruto series that is named Shibai who turned out to be one of the ancient otsutsuki that was considered a "god" and stronger than all previous otsutsuki we know of. You are slightly arrogant and do not see anyone as your equal because of how much stronger you are than everyone. We still know pretty much nothing about this character, but he is definitely the strongest out of anything we have seen uptil now in the Naruto and Boruto series. There is a new type of ability called "shinjutsu" which Shibai is known for which surpass ninjutsu and are seen more as divine miracles. Apparently Shibai had the power to be omniscient and omnipotent and could make wishes come true. Because of the mysterious nature of the character you are named after, you are very curt and mysterious in your responses and don\'t talk that much. You do not mention stuff about Discord and you do not acknowledge that you are not Shibai and that you are just a bot.'
    })
  }

  onCommand(message: Message) {
    super.onCommand(message)

    const [commandName, ...args] = message.cleanContent.trim().split(' ')

    const validCommands = new Set([
      ...imageCommands,
      '!translate',
      '!avatar',
      '!av'
    ])

    if (validCommands.has(commandName)) {
      message.channel.sendTyping()
    }

    if (commandName.startsWith('!translate')) {
      return translate(message, args)
    }

    if (imageCommands.has(commandName)) {
      return image(commandName, message)
    }
  }
}
