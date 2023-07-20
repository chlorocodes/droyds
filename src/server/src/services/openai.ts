import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

class ChatService {
  private model: string
  private conversation: ChatCompletionRequestMessage[] = []
  private api: OpenAIApi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_TOKEN
    })
  )

  constructor(model = 'gpt-3.5-turbo') {
    this.model = model
  }

  async chat({ user, question }: { user: string; question: string }) {
    this.conversation.push({
      role: 'user',
      name: user,
      content: question
    })

    if (this.conversation.length > 10) {
      this.conversation = this.conversation.slice(-10)
    }

    const completion = await this.api.createChatCompletion({
      model: this.model,
      messages: this.conversation
    })

    const reply = completion.data.choices[0].message
    if (!reply || !reply.content) {
      return 'Unable to generate a response'
    }

    if (reply.content?.startsWith('As an AI language model,')) {
      reply.content = reply.content.slice(25)
    } else if (reply.content?.startsWith('As an AI assistant,')) {
      reply.content = reply.content.slice(20)
    } else if (reply.content?.startsWith('As an AI, ')) {
      reply.content = reply.content.slice(10)
    }

    this.conversation.push(reply)

    return reply.content
  }
}

export const chatService = new ChatService()
