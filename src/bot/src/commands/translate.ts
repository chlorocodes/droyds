import { Message } from 'discord.js'
import { api } from '../api/client'

export async function translate(message: Message) {
  const reference = await message.fetchReference()
  const untranslated = reference.content
  const translation = await api.translate(untranslated)
  return translation
}
