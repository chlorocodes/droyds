type FactResponse = Array<{
  fact: string
}>

class APINinjasService {
  private baseUrl = 'https://api.api-ninjas.com/v1'
  private apiKey = process.env.API_NINJA_KEY as string

  async getFacts(count = 1) {
    const url = `${this.baseUrl}/facts?limit=${count}`
    const items = await this.request<FactResponse>(url)
    const facts = items.map((item) => item.fact)
    return facts
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'X-Api-Key': this.apiKey
      }
    })
    const json = await response.json()
    return json as T
  }
}

export const apiNinjasService = new APINinjasService()
