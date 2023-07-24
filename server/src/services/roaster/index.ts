interface InsultResponse {
  number: string
  language: string
  insult: string
  created: string
  shown: string
  createdby: string
  active: string
  comment: string
}

export class RoastService {
  async roast() {
    const response = await fetch(
      'https://evilinsult.com/generate_insult.php?lang=en&type=json'
    )
    const { insult }: InsultResponse = await response.json()
    return insult
  }

  mock(message: string) {
    const lowercaseMessage = message.toLowerCase()
    const mockingcaseMessage = lowercaseMessage
      .split('')
      .map((letter) => (Math.random() > 0.5 ? letter.toUpperCase() : letter))
      .join('')
    return mockingcaseMessage
  }
}

export const roaster = new RoastService()
