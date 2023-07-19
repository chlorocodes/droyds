import { Message } from 'discord.js'
import { Command } from '../types/util'
import { translate } from './translate'
import { abuse } from './abuse'
import { defaultCommandHandler } from './default'

export function commandHandler(
  message: Message,
  registeredCommands: Command[]
) {
  const commandName = message.content.trim().toLowerCase()

  switch (commandName) {
    case '!translate':
      return translate(message)

    case '!abuse':
      return abuse(message)

    default:
      return defaultCommandHandler(commandName, registeredCommands)
  }
}
