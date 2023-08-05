export interface BotInfo {
  id: string
  adminId: string
  shibuyaServerId: string
  shibuyaOwnerId: string
  channelId: string
  archiveChannelId: string
  saloonChannelId: string
  debugChannelId: string
  roleId: string
}

export const botInfo: BotInfo = {
  id: process.env.DISCORD_BOT_ID as string,
  adminId: process.env.DISCORD_BOT_ADMIN_ID as string,
  shibuyaServerId: process.env.DISCORD_BOT_SHIBUYA_SERVER_ID as string,
  shibuyaOwnerId: process.env.DISCORD_BOT_SHIBUYA_OWNER_ID as string,
  channelId: process.env.DISCORD_BOT_LYME_CHANNEL_ID as string,
  archiveChannelId: process.env.DISCORD_BOT_ARCHIVE_CHANNEL_ID as string,
  saloonChannelId: process.env.DISCORD_BOT_SALOON_CHANNEL_ID as string,
  debugChannelId: process.env.DISCORD_BOT_DEBUG_CHANNEL_ID as string,
  roleId: process.env.DISCORD_BOT_ROLE_ID as string
}
