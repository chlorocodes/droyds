import { discordService } from '@droyds/core/services'
import { LoginSchema } from '../schemas/auth.js'
import { RouteHandler } from '../types/routes.js'

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