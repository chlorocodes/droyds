import { AnyObject } from '../types/util'

interface Options {
  baseUrl?: string
}

export class APIClient {
  baseUrl: string

  constructor({ baseUrl = '/api' }: Options = {}) {
    this.baseUrl = baseUrl
  }

  async askAI(question: string) {
    const answer = await this.post('/openai/chat', { question })
    return answer
  }

  async translate(text: string) {
    const translation = await this.post('/google/translate', { text })
    return translation
  }

  private async post(url: string, body: AnyObject) {
    const response = await this.request(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    return response
  }

  private async get(url: string, paramsObj: AnyObject) {
    const queryParams = new URLSearchParams(paramsObj).toString()
    const urlWithParams = `${url}?${queryParams}`
    const response = await this.request(urlWithParams)
    return response
  }

  private async request(url: string, options: RequestInit = {}) {
    const fullUrl = `${this.baseUrl}/${url}`
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
        Accept: 'application/json',
        ...(options.method === 'POST' && {
          'Content-Type': 'application/json'
        })
      }
    })
    const json = await response.json()
    return json
  }
}

export const api = new APIClient()
