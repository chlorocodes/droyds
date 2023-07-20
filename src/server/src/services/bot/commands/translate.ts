import { Message } from 'discord.js'
import { googleService } from '../../google'

export async function translate(message: Message) {
  const reference = await message.fetchReference()
  const untranslated = reference.content
  const translation = await googleService.translate(untranslated)
  return translation
}
