import { Message } from 'discord.js'
import { Bot } from '../core/bot'
import { stories } from '../core/services/stories'
import { delay } from '../core/utils/delay'

export class Graype extends Bot {
  validCommands = ['!story', '!end', '!reset']

  constructor() {
    super({
      token: process.env.GRAYPE_TOKEN as string,
      settings: {
        name: 'Graype',
        color: 0x9266cc,
        isChatEnabled: false,
        id: process.env.GRAYPE_USER_ID as string,
        roleId: process.env.GRAYPE_ROLE_ID as string
      }
    })
  }

  protected override async onMessage(message: Message) {
    if (
      message.author.bot ||
      message.channel.id !== process.env.ONE_WORD_STORY_CHANNEL_ID
    ) {
      return
    }

    if (
      this.validCommands.some((command) => command === message.cleanContent)
    ) {
      this.onCommand(message)
      return
    }

    const word = message.content

    if (!stories.isValidWord(word)) {
      message.delete()
      const reply = await message.channel.send('Invalid word')
      await delay()
      reply.delete()
      return
    }

    message.react('✅')
    stories.addWord(word, message.author)

    const terminators = ['.', '?', '!']
    if (terminators.includes(word.slice(-1))) {
      const embed = stories.display()
      message.channel.send({ embeds: [embed] })
    }
  }

  protected override async onCommand(message: Message) {
    const [commandName, ...args] = message.cleanContent.trim().split(' ')
    message.channel.sendTyping()

    if (commandName === '!story') {
      const storyEmbed = stories.display()
      return message.channel.send({ embeds: [storyEmbed] })
    }

    if (commandName === '!end') {
      console.log('this is running')

      await stories.end()
      const embed = stories.display()
      return message.channel.send({
        content: 'The story is finished! You can see the complete story below:',
        embeds: [embed]
      })
    }

    if (commandName === '!reset') {
      await stories.reset()
      return message.reply('Story has been reset')
    }
  }
}

export const graype = new Graype()
