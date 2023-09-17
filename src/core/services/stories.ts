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
  story: Story = {
    id: '',
    text: ''
  }

  constructor() {
    this.initialize()
  }

  isValidWord(message: string) {
    return message.split(' ').length === 1
  }

  async addWord(word: string, author: User) {
    if (!this.isInitialized) {
      return
    }

    this.story.text += ` ${word}`
    const { id: userId, username } = author

    await db.$transaction([
      db.story.update({
        where: {
          id: this.story.id
        },
        data: {
          text: this.story.text,
          authors: {}
        }
      }),
      db.author.upsert({
        where: { id: userId, storyId: this.story.id },
        create: { id: userId, username, storyId: this.story.id },
        update: {}
      })
    ])
  }

  async end() {
    await db.story.update({
      where: { id: this.story.id },
      data: { isComplete: true }
    })
    this.story = await this.createNextStory()
  }

  displayStory(): APIEmbed {
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
          totalWordCount: 0,
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
}

export const stories = new StoryService()
