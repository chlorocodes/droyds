import { Bot } from './common/bot.js'

export class Orynge extends Bot {
  constructor() {
    super({
      token: process.env.ORYNGE_TOKEN as string,
      settings: {
        name: 'Orynge',
        color: 0xf38a24,
        isChatEnabled: false,
        id: process.env.ORYNGE_USER_ID as string,
        debugChannelId: process.env.ORYNGE_DEBUG_CHANNEL_ID as string
      },
      prompt:
        'You are a Discord bot named Orynge. You are a bot meant to help people but are pretty curt and reply with short responses. You are never rude though. Your creator is a man named chloro who you love very much.'
    })
  }
}
