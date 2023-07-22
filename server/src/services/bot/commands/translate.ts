import { Message } from 'discord.js'
import { googleService } from '../../google'

export async function translate(message: Message, args: string[] = []) {
  let untranslatedText = args.join(' ').trim()

  if (!untranslatedText) {
    const reference = await message.fetchReference()
    untranslatedText = reference.content
  }

  const translation = await googleService.translate(untranslatedText)

  message.reply(`Translation: ${translation}`)
}
