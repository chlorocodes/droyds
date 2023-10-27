import 'dotenv/config'
import { lemyn } from './lemyn/lemyn'
import { lyme } from './lyme/lyme'
import { graype } from './graype/graype'
import { shibai } from './otsutsuki/shibai'
import { momoshiki } from './otsutsuki/momoshiki'
import { urashiki } from './otsutsuki/urashiki'
import { isshiki } from './otsutsuki/isshiki'
import { kaguya } from './otsutsuki/kaguya'
import { kinshiki } from './otsutsuki/kinshiki'
import { orynge } from './orynge/orynge'

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
