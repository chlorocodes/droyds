import cheerio from 'cheerio'

class ComplimentService {
  async getCompliments(count = 1) {
    const url = `https://www.generatormix.com/random-compliment-generator?number=${count}`
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    const compliments = $('blockquote')
      .toArray()
      .map((quote) => $(quote).text())

    return compliments
  }
}

export const complimenter = new ComplimentService()
