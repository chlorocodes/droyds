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

const bots = [
  lemyn,
  lyme,
  graype,
  shibai,
  isshiki,
  kaguya,
  momoshiki,
  kinshiki,
  urashiki
]

bots.forEach((bot) => {
  bot.start()
})
