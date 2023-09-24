import { join } from 'node:path'
import { Message } from 'discord.js'

const assetsPath = join(__dirname, '..', 'assets')

interface ImageData {
  path: string
  aliases: string[]
}

export const imageCommandsWithAliases: Record<string, ImageData> = {
  wat: {
    path: 'wat.png',
    aliases: ['!what', '!wat', '!wut', '!huh', '!bruh']
  },
  powerscaling: {
    path: 'powerscaling.png',
    aliases: ['!powerscaling']
  },
  man: {
    path: 'man.png',
    aliases: ['!man']
  },
  mirror: {
    path: 'mirror.png',
    aliases: ['!mirror']
  },
  stupid: {
    path: 'stupid.jpeg',
    aliases: ['!stupid', '!idiot', '!dumb', '!moron', '!dumbass']
  },
  woot: {
    path: 'woot.jpeg',
    aliases: ['!woot']
  },
  bitchPls: {
    path: 'bitchPls.jpg',
    aliases: ['!bitchPls', '!bitchplease', '!bitchpls', '!bitchPlease']
  }
}

export const imageCommands = new Set(
  Object.values(imageCommandsWithAliases)
    .map(({ aliases }) => aliases)
    .flat()
)

function getImagePath(commandName: string) {
  const { path } = Object.values(imageCommandsWithAliases).find(({ aliases }) =>
    aliases.includes(commandName)
  ) as ImageData

  const imagePath = join(assetsPath, path)

  return imagePath
}

export async function image(commandName: string, message: Message) {
  const imagePath = getImagePath(commandName)
  const files = [{ attachment: imagePath }]
  await message.channel.send({ files })
  message.delete()
}
