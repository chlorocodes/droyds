import { test, expect } from '@playwright/test'

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time))

test('has title', async ({ page }) => {
  const url =
    'https://discord.com/login?redirect_to=%2Fchannels%2F1107630815606743072%2F1113260064552259634'
  await page.goto(url)
  await page.getByLabel('Email or Phone Number').fill('saad@saadq.com')
  await page.getByLabel('Password').fill('Light123!')
  await page.locator('button[type="submit"]').click()
  await wait(5000)
  await page.screenshot({ path: './screenshots/screenshot.png' })
})
