import { Bot } from '../../common/bot.js'

export class Orynge extends Bot {
  constructor() {
    super({
      token:
        'MTEzOTc5Njc3OTczOTY2NDM5NQ.GLNb1w.5-xduHKkJRoc33yS_tXTjvmcKeXnvRYZDCg3FU',
      settings: {
        name: 'Orynge',
        color: 0xf38a24,
        isChatEnabled: false,
        id: '1139796779739664395',
        roleId: '1153456826638159946',
        debugChannelId: process.env.DEBUG_ORYNGE_CHANNEL_ID as string
      },
      prompt:
        'You are a Discord bot named Orynge. You are a bot meant to help people but are pretty curt and reply with short responses. You are never rude though. Your creator is a man named chloro who you love very much.'
    })
  }
}
