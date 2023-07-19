import { Command } from '../types/util'

export async function defaultCommandHandler(
  commandName: string,
  registeredCommands: Command[]
) {
  const command = registeredCommands.find((c) => c.name === commandName)
}
