import 'dotenv/config'
import { lemyn } from './bots/lemyn/lemyn'
import { lyme } from './bots/lyme/lyme'
import { graype } from './bots/graype/graype'
import { shibai } from './bots/otsutsuki/shibai'
import { momoshiki } from './bots/otsutsuki/momoshiki'
import { urashiki } from './bots/otsutsuki/urashiki'
import { isshiki } from './bots/otsutsuki/isshiki'
import { kaguya } from './bots/otsutsuki/kaguya'
import { kinshiki } from './bots/otsutsuki/kinshiki'
import { orynge } from './bots/orynge/orynge'

const bots = [
  lemyn,
  lyme,
  graype,
  shibai,
  isshiki,
  kaguya,
  momoshiki,
  kinshiki,
  urashiki,
  orynge
]

bots.forEach((bot) => {
  bot.start()
})
