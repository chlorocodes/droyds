import { join } from 'node:path'
import { Message } from 'discord.js'
import { NormalizedCommands } from '../types/util'

interface SimpleCommandHandlerParams {
  message: Message
  registeredCommands: NormalizedCommands
  commandName: string
  assetsPath: string
}

export async function simple({
  message,
  registeredCommands,
  commandName,
  assetsPath
}: SimpleCommandHandlerParams) {
  const command = registeredCommands[commandName]

  if (!command) {
    return
  }

  const { response, responseType } = command
  if (responseType === 'text') {
    message.reply(response)
  } else if (responseType === 'image') {
    const imagePath = join(assetsPath, response)
    const files = [{ attachment: imagePath }]
    message.channel.send({ files })
  }
}
