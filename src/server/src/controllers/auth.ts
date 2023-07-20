import { LoginSchema } from '../schemas/auth'
import { discordService } from '../services/discord'
import { RouteHandler } from '../types/routes'

export const auth: RouteHandler = (req, res) => {
  const authUrl = discordService.getAuthUrl()
  return res.redirect(authUrl)
}

export const login: RouteHandler<LoginSchema> = async (req, res) => {
  const { code } = req.query
  const user = await discordService.login(code)
  req.session.userId = user.id
  req.session.username = user.username
  res.redirect('/account')
}
