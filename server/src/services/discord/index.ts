import { AuthToken } from '../../types/discord'
import { botInfo } from '../bot/config/bot-info'

export class DiscordService {
  private baseUrl = 'https://discord.com/api'
  private clientId = process.env.DISCORD_CLIENT_ID as string
  private clientSecret = process.env.DISCORD_CLIENT_SECRET as string
  private redirectUri = process.env.DISCORD_REDIRECT_URI as string
  private scope = 'identify%20guilds%20guilds.members.read'

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

    const [userResponse, memberResponse] = await Promise.all([
      fetch(`${this.baseUrl}/users/@me`, {
        headers: { Authorization: `${token.token_type} ${token.access_token}` }
      }),
      fetch(
        `${this.baseUrl}/users/@me/guilds/${botInfo.shibuyaServerId}/member`,
        {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`
          }
        }
      )
    ])

    const [user, member] = await Promise.all([
      userResponse.json(),
      memberResponse.json()
    ])

    console.log(member)

    return user
  }
}

export const discordService = new DiscordService()
