import 'dotenv/config'
import { lemyn } from './bots/lemyn/lemyn'
import { lyme } from './bots/lyme/lyme'
import { graype } from './bots/graype/graype'

lemyn.start()
lyme.start()
graype.start()
