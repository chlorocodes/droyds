import { Mynt } from './mynt.js'
import { Lyme } from './lyme.js'
import { Lemyn } from './lemyn.js'
import { Orynge } from './orynge.js'
import { Shibai } from './shibai.js'
import { Momoshiki } from './momoshiki.js'
import { Urashiki } from './urashiki.js'
import { Isshiki } from './isshiki.js'
import { Kaguya } from './kaguya.js'
import { Kinshiki } from './kinshiki.js'

const bots = [
  new Mynt(),
  new Lyme(),
  new Lemyn(),
  new Orynge(),
  new Shibai(),
  new Isshiki(),
  new Momoshiki(),
  new Kinshiki(),
  new Urashiki(),
  new Kaguya()
]

bots.forEach((bot) => {
  bot.start()
})
