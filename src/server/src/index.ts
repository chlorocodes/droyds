import {
  Graype,
  Isshiki,
  Kaguya,
  Kinshiki,
  Lemyn,
  Lyme,
  Momoshiki,
  Orynge,
  Shibai,
  Urashiki
} from '@droyds/bots'
import dotenv from 'dotenv'
import { app } from './app.js'

dotenv.config()

const isProd = process.env.NODE_ENV === 'production'
const host = '::'
const port = Number(process.env.PORT) ?? (isProd ? 80 : 3000)

const bots = [
  new Lyme(),
  new Lemyn(),
  new Graype(),
  new Orynge(),
  new Shibai(),
  new Isshiki(),
  new Momoshiki(),
  new Kinshiki(),
  new Urashiki(),
  new Kaguya()
]

app
  .listen({ host, port })
  .then(() => bots.forEach((bot) => bot.start()))
  .catch((error) => console.error(error))
