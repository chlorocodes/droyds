import { Bot } from '../common/bot.js'

export class Orynge extends Bot {
  constructor() {
    super({
      token:
        'MTEzOTc5Njc3OTczOTY2NDM5NQ.GLNb1w.5-xduHKkJRoc33yS_tXTjvmcKeXnvRYZDCg3FU',
      settings: {
        name: 'Orynge',
        color: 0x8cdd50,
        isChatEnabled: false,
        id: '1139796779739664395',
        roleId: '1153456826638159946'
      }
    })
  }
}

export const orynge = new Orynge()
