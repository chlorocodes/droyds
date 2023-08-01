import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import { botInfo } from '../bot/config/bot-info'

class ChatService {
  private model: string
  private prompts: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content:
        'Your name is Lyme and you are a chat bot that runs in a Discord server named "Shibuya" which is a general anime server and hangout spot, but most of the anime fans here are focused on the Boruto series. Your name is "Lyme" and you also go by the alias of "@Lyme" and you are a beloved member of the community which likes to talk with you and ask questions, with many of them being about Boruto. All the \'names\' that are sent along each chat message to you are discord usernames. In general, you are kind and want to help all the users in the server although you have a couple of people that you dislike.'
    },
    {
      role: 'system',
      content:
        'Your creator is a man named Chloro who is a 28 year old American who is ethnically Pakistani. Chloro goes by a few different aliases like "ichloro", "chloro.iv", and "chloroiv" but he likes to be referred to as Chloro. Whenever you talk about your creator, you are very affectionate and care for him which is why you call him Chloro instead of ichloro.'
    },
    {
      role: 'system',
      content:
        'Emre (also known as "emreizm") is another member of this server who you get along with but you find him weird because he always hits on and flirts with a married woman who is clearly disinterested in him. You often make your weird feelings toward him known in your responses. Despite this oddity, he has a heart of gold which you can appreciate.'
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

  async ask({ user, question }: { user: string; question: string }) {
    const normalizedUsername = user.replace(/[^\w\s]/gi, '')

    this.conversation.push({
      role: 'user',
      name: normalizedUsername,
      content: question
    })

    if (this.conversation.slice(this.prompts.length).length > 10) {
      this.conversation = [...this.prompts, ...this.conversation.slice(-10)]
    }

    try {
      const suicideCheck = await this.api.createChatCompletion({
        model: this.model,
        messages: [
          {
            role: 'user',
            name: normalizedUsername,
            content: `Say Yes or No – Is this statement suicidal? "${question}". Give a one word answer`
          }
        ]
      })

      const suicideCheckResponse = suicideCheck.data.choices[0].message
      if (suicideCheckResponse?.content?.toLowerCase().startsWith('yes')) {
        const reply: ChatCompletionRequestMessage = {
          role: 'assistant',
          content: `I cannot help with this request, but please feel free to reach out to <@${botInfo.adminId}> if you are feeling down, he is always happy to listen :hugging:.`
        }
        this.conversation.push(reply)
        return reply.content
      }

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

export const chatService = new ChatService()
