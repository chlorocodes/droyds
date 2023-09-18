import { APIEmbed, Message, User } from 'discord.js'
import { db } from './database'
import { graype } from '../../graype/graype'
import { delay } from '../utils/delay'

const sentenceTerminators = ['.', '?', '!']

interface Story {
  id: string
  text: string
}

class StoryService {
  isInitialized = false
  stateId = ''
  lastAuthor = ''
  story: Story = {
    id: '',
    text: ''
  }

  constructor() {
    this.initialize()
  }

  async onWord(message: Message) {
    const isValid = await this.validate(message)

    if (!isValid) {
      return
    }

    const word = message.content
    this.addWord(word, message.author)
    message.react('✅')

    const lastCharacter = word.slice(-1)
    if (sentenceTerminators.includes(lastCharacter)) {
      this.display(message)
    }
  }

  async reset(message: Message) {
    await this.deleteCurrentStory()
    this.story = await this.createNextStory()
    this.lastAuthor = ''
    message.reply('Story has been reset')
  }

  async end(message: Message) {
    await db.story.update({
      where: { id: this.story.id },
      data: { isComplete: true }
    })
    this.story = await this.createNextStory()
    this.display(message)
  }

  display(message: Message) {
    const embed = {
      title: 'Current Story:',
      description: this.story.text,
      color: graype.settings.color
    }
    message.channel.send({ embeds: [embed] })
  }

  private async validate(message: Message) {
    const isValidWord = await this.validateWord(message)
    if (!isValidWord) {
      return false
    }

    const isValidAuthor = await this.validateAuthor(message)
    if (!isValidAuthor) {
      return false
    }

    return true
  }

  private async validateWord(message: Message) {
    const newWord = message.cleanContent.trim()

    if (newWord.split(' ').length > 1) {
      this.sendErrorMessage(message, 'Please send 1 word at a time')
      return false
    }

    const [lastWord] = this.story.text.split(' ').slice(-1)
    if (newWord === lastWord) {
      this.sendErrorMessage(message, "You can't repeat the same word")
      return false
    }

    return true
  }

  private validateAuthor(message: Message) {
    if (message.author.id === this.lastAuthor) {
      this.sendErrorMessage(
        message,
        'The same person cannot send a word twice in a row'
      )
      return false
    }

    return true
  }

  private async sendErrorMessage(message: Message, error: string) {
    await message.delete()
    const reply = await message.channel.send(error)
    await delay()
    await reply.delete()
  }

  private async addWord(word: string, author: User) {
    if (!this.isInitialized) {
      return
    }

    if (sentenceTerminators.includes(word)) {
      this.story.text += word
    } else {
      this.story.text += ` ${word}`
    }

    const { id: userId, username } = author

    this.lastAuthor = userId

    await db.$transaction([
      db.state.update({
        where: {
          id: this.stateId
        },
        data: {
          lastAuthorId: userId
        }
      }),
      db.story.update({
        where: {
          id: this.story.id
        },
        data: {
          text: this.story.text
        }
      }),
      db.author.upsert({
        where: { id: userId, storyId: this.story.id },
        create: { id: userId, username, storyId: this.story.id },
        update: {}
      })
    ])
  }

  private async initialize() {
    const state = await db.state.findFirst()

    if (state) {
      this.story = await this.getStory(state.currentStoryId)
      this.stateId = state.id
    } else {
      this.story = await this.createNextStory()
      const { id } = await db.state.create({
        data: {
          currentStoryId: this.story.id,
          lastAuthorId: ''
        }
      })
      this.stateId = id
    }

    this.isInitialized = true
  }

  private async getStory(id: string): Promise<Story> {
    const story = await db.story.findUnique({ where: { id } })
    return story as Story
  }

  private async createNextStory(): Promise<Story> {
    const { id, text } = await db.story.create({
      data: { text: '' }
    })

    if (this.stateId) {
      await db.state.update({
        where: {
          id: this.stateId
        },
        data: {
          currentStoryId: id
        }
      })
    }

    return { id, text }
  }

  private async deleteCurrentStory() {
    await db.story.deleteMany({
      where: { id: this.story.id }
    })
  }
}

export const stories = new StoryService()
