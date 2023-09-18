import { APIEmbed, User } from 'discord.js'
import { db } from './database'
import { graype } from '../../graype/graype'

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

  isValidWord(message: string) {
    if (message.split(' ').length !== 1) {
      return false
    }

    const [lastWord] = this.story.text.split(' ').slice(-1)
    if (message === lastWord) {
      return false
    }

    return true
  }

  async addWord(word: string, author: User) {
    if (!this.isInitialized) {
      return
    }

    const terminators = ['?', '!', '.']

    if (terminators.includes(word)) {
      this.story.text += word
    } else {
      this.story.text += ` ${word}`
    }

    const { id: userId, username } = author

    await db.$transaction([
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

  async reset() {
    await this.deleteCurrentStory()
    this.story = await this.createNextStory()
  }

  async end() {
    await db.story.update({
      where: { id: this.story.id },
      data: { isComplete: true }
    })
    this.story = await this.createNextStory()
  }

  display(): APIEmbed {
    return {
      title: 'Current Story:',
      description: this.story.text,
      color: graype.settings.color
    }
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
          currentStoryId: this.story.id
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
