import cheerio from 'cheerio'

interface ComplimentResponse {
  compliment: string
}

export class ComplimentService {
  async compliment() {
    const response = await fetch(
      'https://www.generatormix.com/random-compliment-generator?number=1'
    )
    const html = await response.text()
    const $ = cheerio.load(html)
    const compliment = $('blockquote').text()
    return compliment
  }
}

export const complimenter = new ComplimentService()
