import { join } from 'node:path'
import { rm } from 'node:fs/promises'
import { chromium } from 'playwright-extra'
import stealth from 'puppeteer-extra-plugin-stealth'
import recaptcha from 'puppeteer-extra-plugin-recaptcha'

class ArchiverService {
  private chromium: typeof chromium
  private discordUser = process.env.DISCORD_ADMIN_USERNAME as string
  private discordPass = process.env.DISCORD_ADMIN_PASSWORD as string
  private captchaApiKey = process.env.CAPTCHA_API_KEY as string
  private screenshotsFolder = join(__dirname, 'screenshots')
  screenshotPath = join(this.screenshotsFolder, 'screenshot.png')

  constructor() {
    this.chromium = chromium
    this.chromium.use(stealth())
    this.chromium.use(
      recaptcha({
        provider: { id: '2captcha', token: this.captchaApiKey },
        visualFeedback: true
      })
    )
  }

  async takePageScreenshot(guildId: string, channelId: string) {
    const { page, browser } = await this.login(guildId, channelId)
    await page.screenshot({ path: this.screenshotPath })
    await page.close()
    await browser.close()
  }

  async takeMessageScreenshot(
    message: string,
    guildId: string,
    channelId: string
  ) {
    const { page, browser } = await this.login(guildId, channelId)
    console.log(await page.content())
    const element = await page.getByText(message).last()
    await element.screenshot({ path: this.screenshotPath })
    await page.close()
    await browser.close()
  }

  async destroyScreenshots() {
    await rm(this.screenshotsFolder, {
      recursive: true,
      force: true
    })
  }

  private async login(guildId: string, channelId: string) {
    const browser = await this.chromium.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(this.getLoginUrl(guildId, channelId))
    await page.getByLabel('Email or Phone Number').fill(this.discordUser)
    await page.getByLabel('Password').fill(this.discordPass)
    await page.locator('button[type="submit"]').click()
    await page.solveRecaptchas()
    await this.sleep(8500)
    return { page, browser }
  }

  private getLoginUrl(guildId: string, channelId: string) {
    const redirectUri = encodeURIComponent(
      this.getRedirectUrl(guildId, channelId).paths
    )
    const url = `https://discord.com/login?redirect_to=${redirectUri}`
    return url
  }

  private getRedirectUrl(guildId: string, channelId: string) {
    const baseUrl = 'https://discord.com'
    const paths = `/channels/${guildId}/${channelId}`
    const fullUrl = baseUrl + paths
    return { baseUrl, paths, fullUrl }
  }

  private sleep(time = 3500) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

export const archiver = new ArchiverService()
