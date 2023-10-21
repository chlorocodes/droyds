import 'dotenv/config'
import * as bots from './bots'

Object.values(bots).forEach((bot) => {
  bot.start()
})
