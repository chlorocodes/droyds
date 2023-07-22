// import playwright from 'playwright'

// function getUrl() {
//   const redirectUri = '%2Fchannels%2F1107630815606743072%2F1113260064552259634'
//   const url = `https://discord.com/login?redirect_to=${redirectUri}`
//   return url
// }

// async function main() {
//   const browser = await playwright.chromium.launch()
//   // const context = await browser.newContext()
//   const page = await browser.newPage()
//   await page.goto(getUrl())
//   await page.getByLabel('Email or Phone Number').fill('saad@saadq.com')
//   await page.getByLabel('Password').fill('Light123!')
//   await page.locator('button[type="submit"]').click()
//   await page.screenshot({ path: './screenshots/screenshot.png' })
//   await page.close()
//   await browser.close()
// }

// main()

import 'dotenv/config'
import { join } from 'node:path'
import { rm } from 'node:fs/promises'
import { chromium } from 'playwright'

class ArchiverService {
  private discordUser = process.env.DISCORD_ADMIN_USERNAME as string
  private discordPass = process.env.DISCORD_ADMIN_PASSWORD as string
  private screenshotsFolder: string
  private screenshotFilename: string
  screenshotPath: string

  constructor(folder: string, filename: string) {
    this.screenshotFilename = filename
    this.screenshotsFolder = folder
    this.screenshotPath = join(folder, filename)
  }

  async takeScreenshot() {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(this.getLoginUrl())
    await page.getByLabel('Email or Phone Number').fill(this.discordUser)
    await page.getByLabel('Password').fill(this.discordPass)
    await page.locator('button[type="submit"]').click()
    await page.waitForURL(this.getRedirectUrl().fullUrl)
    await page.screenshot({ path: join(this.screenshotPath) })
    await page.close()
    await browser.close()
  }

  async destroyScreenshots() {
    await rm(this.screenshotsFolder, {
      recursive: true,
      force: true
    })
  }

  private getLoginUrl() {
    const redirectUri = encodeURIComponent(this.getRedirectUrl().paths)
    const url = `https://discord.com/login?redirect_to=${redirectUri}`
    return url
  }

  private getRedirectUrl() {
    const baseUrl = 'https://discord.com'
    const paths = '/channels/1107630815606743072/1113260064552259634'
    const fullUrl = baseUrl + paths
    return { baseUrl, paths, fullUrl }
  }
}

export const archiver = new ArchiverService(
  join(__dirname, 'screenshots'),
  'screenshot.png'
)

archiver.takeScreenshot()
