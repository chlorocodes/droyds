export interface BotInfo {
  id: string
  adminId: string
  channelId: string
  roleId: string
}

export const botInfo: BotInfo = {
  id: process.env.DISCORD_BOT_ID as string,
  adminId: process.env.DISCORD_BOT_ADMIN_ID as string,
  channelId: process.env.DISCORD_BOT_CHANNEL_ID as string,
  roleId: process.env.DISCORD_BOT_ROLE_ID as string
}
