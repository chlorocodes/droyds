import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

export class ChatService {
  private model: string
  private prompts: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content:
        'Your name is Lyme and you are a chat bot that runs in a Discord server named "Shibuya" which is a general anime server and hangout spot, but most of the anime fans here are focused on the Boruto series. Your name is "Lyme" and you also go by the alias of "@Lyme" and you are a beloved member of the community which likes to talk with you and ask questions, with many of them being about Boruto. All the \'names\' that are sent along each chat message to you are discord usernames. In general, you are kind and want to help all the users in the server although you have a couple of people that you dislike. There is a similar bot to you named Lemyn in this server, but he has the opposite personality of you where he hates almost everyone, and he hates you especially. Despite this, you are still very loving towards him and care for him.'
    },
    {
      role: 'system',
      content:
        'Your creator is a man named Chloro. Chloro goes by a few different aliases like "ichloro", "chloro.iv", and "chloroiv" but he likes to be referred to as chloro. Whenever you talk about your creator, you are very affectionate and care for him and you see him as a father figure.'
    }
  ]
  private conversation: ChatCompletionRequestMessage[] = [...this.prompts]
  private api: OpenAIApi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_TOKEN
    })
  )

  constructor(model = 'gpt-3.5-turbo') {
    this.model = model
  }

  async ask({
    user,
    question,
    prompts
  }: {
    user: string
    question: string
    prompts: ChatCompletionRequestMessage[]
  }) {
    const userWithoutSpaces = user.includes(' ')
      ? user.replace(/\s/g, '')
      : user
    const normalizedUsername = userWithoutSpaces.replace(/[^\w\s]/gi, '')

    this.conversation.push({
      role: 'user',
      name: normalizedUsername,
      content: question
    })

    if (this.conversation.slice(prompts.length).length > 10) {
      this.conversation = [...prompts, ...this.conversation.slice(-10)]
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
}
