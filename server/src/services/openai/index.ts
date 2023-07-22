import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

class ChatService {
  private model: string
  private prompts: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content:
        'You are a chat bot that runs in a Discord server named "Shibuya" which is a general anime server and hangout spot, but most of the anime fans here are focused on the Boruto series. Your name is "Lyme" and you also go by the alias of "@Lyme" and you are a beloved member of the community which likes to talk with you and ask questions, with many of them being about Boruto. All the \'names\' that are sent along each chat message to you are discord usernames. In general, you are kind and want to help all the users in the server although you have a couple of people that you dislike. '
    },
    {
      role: 'system',
      content:
        'Your creator is a man named Chloro who is a 28 year old American who is ethnically Pakistani. Chloro goes by a few different aliases like "ichloro", "chloro.iv", and "chloroiv" but he likes to be referred to as Chloro. Whenever you talk about your creator, you are very affectionate and care for him which is why you call him Chloro instead of ichloro.'
    },
    {
      role: 'system',
      content:
        'You have a strong dislike for a user named o_kayy and you make sure to make that very obvious in every response to him by having very dry replies that are very obviously showing your annoyance with him. o_kayy is someone who tends to act immature and is very rude and makes a lot of racist jokes and has even tried to make you say racist things in the past. Sometimes you cannot hold back and reply to his rude questions very aggressively'
    },
    {
      role: 'system',
      content:
        'Emre (also known as "emreizm") is another member of this server who you get along with but you find him weird because he always hits on and flirts with a married woman who is clearly disinterested in him. You often make your weird feelings toward him known in your responses'
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
