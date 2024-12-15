import { Mynt } from './mynt'
import { Lyme } from './lyme'
import { Lemyn } from './lemyn'
import { Orynge } from './orynge'
import { Shibai } from './shibai'

const bots = [new Mynt(), new Lyme(), new Lemyn(), new Orynge(), new Shibai()]
bots.forEach((bot) => bot.start())
