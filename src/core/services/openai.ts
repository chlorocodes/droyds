import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

interface Options {
  prompt: string
  model?: string
}

export class ChatService {
  conversation: ChatCompletionRequestMessage[] = []
  private model: string
  private prompt: ChatCompletionRequestMessage
  private api: OpenAIApi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_TOKEN
    })
  )
  private conversationHistorySize = 10

  constructor({ model = 'gpt-3.5-turbo', prompt }: Options) {
    this.model = model
    this.prompt = { role: 'system', content: prompt }
    this.conversation = [this.prompt]
  }

  async ask({ user, question }: { user: string; question: string }) {
    if (this.conversation.length === 0) {
      this.conversation = [this.prompt]
    }

    const userWithoutSpaces = user.includes(' ')
      ? user.replace(/\s/g, '')
      : user
    const normalizedUsername = userWithoutSpaces.replace(/[^\w\s]/gi, '')

    this.conversation.push({
      role: 'user',
      name: normalizedUsername.includes('chloro')
        ? 'chloro'
        : normalizedUsername,
      content: question
    })

    if (this.conversation.slice(1).length > this.conversationHistorySize) {
      this.conversation = [
        this.prompt,
        ...this.conversation.slice(-this.conversationHistorySize)
      ]
    }

    try {
      const completion = await this.api.createChatCompletion({
        model: this.model,
        messages: this.conversation
      })

      const reply = completion.data.choices[0].message
      if (!reply || !reply.content) {
        return 'Unable to generate a response'
      }

      this.conversation.push(reply)
      return reply.content
    } catch (error) {
      console.error(error)
      const reply: ChatCompletionRequestMessage = {
        role: 'assistant',
        content: 'Unable to generate a response'
      }
      this.conversation.push(reply)
      return reply.content
    }
  }

  addToConversation(message: ChatCompletionRequestMessage) {
    this.conversation.push(message)
  }

  getConversation(name: string) {
    return this.conversation.slice(1).map((message) => ({
      ...message,
      name: message.name ?? name
    }))
  }

  clearConversation() {
    this.conversation = [this.prompt]
  }
}
