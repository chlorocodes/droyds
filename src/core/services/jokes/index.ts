interface Joke {
  category: 'Pun'
  type: 'twopart'
  setup: 'What do you call a witch at the beach?'
  delivery: 'A Sandwich.'
  flags: {
    nsfw: false
    religious: false
    political: false
    racist: false
    sexist: false
    explicit: false
  }
  id: 176
  safe: true
  lang: 'en'
}

interface SingleJokeResponse extends Joke {
  error: boolean
}

interface MultiJokeResponse {
  error: boolean
  amount: number
  jokes: Joke[]
}

type JokeResponse = SingleJokeResponse | MultiJokeResponse

export class JokesService {
  async getJokes(count = 1): Promise<Joke[]> {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/Miscellaneous,Dark?blacklistFlags=religious,racist&type=twopart&amount=${count}`
    )
    const jokes: JokeResponse = await response.json()
    if ('amount' in jokes) {
      return jokes.jokes
    } else {
      return [jokes]
    }
  }
}

export const jokes = new JokesService()
