import { ServerState } from '@prisma/client'
import { Message } from 'discord.js'
import { db } from './database.js'
import { delay } from '../utils/delay.js'

const articles = ['!', '?', ':', ';', '-', '–', '.', ',']
const sentenceTerminators = ['.', '?', '!']

class OneWordStoryService {
  async onWord(message: Message<true>) {
    const serverId = message.guildId
    const serverState = await this.initializeServerState(serverId)

    const isValid = await this.validateWordAndAuthor(message, serverState)
    if (!isValid) return

    const word = message.content
    await this.addWordToStory(word, message, serverState)

    message.react('✅')

    const lastCharacter = word.slice(-1)
    if (sentenceTerminators.includes(lastCharacter)) {
      this.displayStory(message, serverState)
    }
  }

  async reset(message: Message<true>) {
    const serverId = message.guildId
    const serverState = await this.initializeServerState(serverId)

    await db.$transaction([
      db.word.deleteMany({
        where: { storyId: serverState.currentStoryId }
      }),
      db.serverState.update({
        where: { id: serverState.id },
        data: {
          lastAuthorId: '',
          lastWord: ''
        }
      })
    ])
    message.reply('Story has been reset.')
  }

  async end(message: Message<true>, storyName: string = 'Unnamed Story') {
    const serverId = message.guildId
    const serverState = await this.initializeServerState(serverId)

    const nextStoryId = await this.createNewStory()
    await db.$transaction([
      db.oneWordStory.update({
        where: { id: serverState.currentStoryId },
        data: { isComplete: true, name: storyName }
      }),
      db.serverState.update({
        where: { id: serverState.id },
        data: {
          currentStoryId: nextStoryId,
          lastAuthorId: '',
          lastWord: ''
        }
      })
    ])
    await this.displayStory(
      message,
      serverState,
      'Story ended! A new story has started.'
    )
  }

  private async initializeServerState(serverId: string) {
    let state = await db.serverState.findUnique({
      where: { serverId }
    })

    if (!state) {
      const storyId = await this.createNewStory()
      state = await db.serverState.create({
        data: {
          serverId,
          currentStoryId: storyId,
          lastAuthorId: '',
          lastWord: ''
        }
      })
    }

    return state
  }

  private async createNewStory(): Promise<string> {
    const story = await db.oneWordStory.create({
      data: {}
    })
    return story.id
  }

  private async addWordToStory(
    word: string,
    message: Message<true>,
    serverState: ServerState
  ) {
    const wordToAdd = sentenceTerminators.includes(word) ? word : ` ${word}`
    const { id: userId, username } = message.author

    await db.$transaction([
      db.author.upsert({
        where: { id: userId },
        create: {
          id: userId,
          username,
          avatar: message.author.displayAvatarURL()
        },
        update: {}
      }),
      db.word.create({
        data: {
          word: wordToAdd,
          storyId: serverState.currentStoryId,
          authorId: userId,
          discordMessageId: message.id
        }
      }),
      db.serverState.update({
        where: { id: serverState.id },
        data: { lastAuthorId: userId, lastWord: wordToAdd }
      })
    ])
  }

  private async validateWordAndAuthor(
    message: Message<true>,
    serverState: ServerState
  ) {
    const input = message.cleanContent.trim()
    const words = input.split(' ')

    if (words.length > 2) {
      this.sendErrorMessage(message, 'Please send only 1 word at a time.')
      return false
    }

    if (words.length === 2) {
      const [first, second] = words
      if (!articles.includes(first) && !articles.includes(second)) {
        this.sendErrorMessage(message, 'Please send only 1 word at a time.')
        return false
      }
    }

    if (input === serverState.lastWord) {
      this.sendErrorMessage(message, "You can't repeat the same word.")
      return false
    }

    if (message.author.id === serverState.lastAuthorId) {
      this.sendErrorMessage(message, 'You cannot send two words in a row.')
      return false
    }

    return true
  }

  private async displayStory(
    message: Message<true>,
    serverState: ServerState,
    title = 'Current Story'
  ) {
    const story = await db.oneWordStory.findUnique({
      where: { id: serverState.currentStoryId },
      include: {
        words: { orderBy: { createdAt: 'asc' } }
      }
    })

    if (!story) return

    const words = story.words.map(({ word }) => word).join('')
    const embed = {
      title,
      description: words,
      color: 0x9266cc
    }

    message.channel.send({ embeds: [embed] })
  }

  private async sendErrorMessage(message: Message<true>, error: string) {
    await message.delete()
    const reply = await message.channel.send(error)
    await delay()
    await reply.delete()
  }
}

export const oneWordStories = new OneWordStoryService()
