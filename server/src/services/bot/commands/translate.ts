import { Message, APIEmbed } from 'discord.js'
import { googleService } from '../../google'

type TranslatedMessage = Pick<Message, 'author' | 'content'>

export async function translate(message: Message, args: string[] = []) {
  if (message.content.startsWith('!translate~')) {
    return multiTranslate(message)
  }
  let untranslatedText = args.join(' ').trim()
  if (!untranslatedText) {
    const reference = await message.fetchReference()
    untranslatedText = reference.content
  }
  const translation = await googleService.translate(untranslatedText)
  message.reply(`Translation: ${translation}`)
}

async function multiTranslate(message: Message) {
  const limit = Number(message.content.split('~')[1])

  if (!limit || Number.isNaN(limit)) {
    return message.reply('Invalid usage')
  }

  if (limit > 10) {
    return message.reply(
      'You can only translate a maximum of 10 messages at a time'
    )
  }

  const collection = await message.channel.messages.fetch({
    limit,
    before: message.id
  })
  const messages = [...collection.values()].reverse()
  const messagesToTranslate = messages.filter(
    (message) => message.content.trim() !== ''
  )
  const translatedMessages: TranslatedMessage[] = await Promise.all(
    messagesToTranslate.map(async (message) => ({
      author: message.author,
      content: await googleService.translate(message.content)
    }))
  )
  const messageEmbed = createEmbed(translatedMessages)
  message.channel.send({ embeds: [messageEmbed] })
}

function createEmbed(translatedMessages: TranslatedMessage[]) {
  const embed: APIEmbed = {
    title: 'Translations',
    color: 0xa3f55c,
    fields: translatedMessages.map((message) => ({
      name: message.author.username,
      value: message.content
    }))
  }
  return embed
}
