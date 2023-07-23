import { join } from 'node:path'
import { rm } from 'node:fs/promises'
import { chromium } from 'playwright'

class ArchiverService {
  private discordUser = process.env.DISCORD_ADMIN_USERNAME as string
  private discordPass = process.env.DISCORD_ADMIN_PASSWORD as string
  private screenshotsFolder = join(__dirname, 'screenshots')
  screenshotPath = join(this.screenshotsFolder, 'screenshot.png')

  async takeScreenshot(guildId: string, channelId: string) {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(this.getLoginUrl(guildId, channelId))
    await page.getByLabel('Email or Phone Number').fill(this.discordUser)
    await page.getByLabel('Password').fill(this.discordPass)
    await page.locator('button[type="submit"]').click()
    await this.sleep(10000)
    await page.screenshot({ path: this.screenshotPath })
    await page.close()
    await browser.close()
  }

  async destroyScreenshots() {
    await rm(this.screenshotsFolder, {
      recursive: true,
      force: true
    })
  }

  private getLoginUrl(guildId: string, channelId: string) {
    const redirectUri = encodeURIComponent(
      this.getRedirectUrl(guildId, channelId).paths
    )
    const url = `https://discord.com/login?redirect_to=${redirectUri}`
    console.log({ loginUrl: url })
    return url
  }

  private getRedirectUrl(guildId: string, channelId: string) {
    const baseUrl = 'https://discord.com'
    const paths = `/channels/${guildId}/${channelId}`
    const fullUrl = baseUrl + paths
    console.log({ redirectUrl: fullUrl })
    return { baseUrl, paths, fullUrl }
  }

  private sleep(time = 3500) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

export const archiver = new ArchiverService()
