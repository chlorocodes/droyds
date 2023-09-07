interface ComplimentResponse {
  compliment: string
}

export class ComplimentService {
  async compliment() {
    const response = await fetch('https://complimentr.com/api')
    const { compliment }: ComplimentResponse = await response.json()
    return compliment
  }
}

export const complimenter = new ComplimentService()
