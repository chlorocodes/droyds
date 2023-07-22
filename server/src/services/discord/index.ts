import { AuthToken } from '../../types/discord'

export class DiscordService {
  private baseUrl = 'https://discord.com/api'
  private clientId = process.env.DISCORD_CLIENT_ID as string
  private clientSecret = process.env.DISCORD_CLIENT_SECRET as string
  private redirectUri = process.env.DISCORD_REDIRECT_URI as string
  private scope = 'identify'

  getAuthUrl() {
    const responseType = 'code'
    const authUrl = `${this.baseUrl}/oauth2/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${responseType}&scope=${this.scope}`
    return authUrl
  }

  async login(code: string) {
    const tokenUrl = `${this.baseUrl}/oauth2/token`
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        scope: this.scope,
        grant_type: 'authorization_code'
      })
    })

    const token: AuthToken = await response.json()
    const userResponse = await fetch(`${this.baseUrl}/users/@me`, {
      headers: { Authorization: `${token.token_type} ${token.access_token}` }
    })
    const user = await userResponse.json()
    return user
  }
}

export const discordService = new DiscordService()
