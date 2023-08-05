import mockingcase from '@strdr4605/mockingcase'

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
    const mockingcaseMessage = mockingcase(message)
    return mockingcaseMessage
  }
}

export const roaster = new RoastService()
