import { test, expect } from '@playwright/test'

test('คำนวณ BMI และบันทึกประวัติ', async ({ page }) => {
  const username = `bmi_${Date.now()}`
  const password = 'Passw0rd!'

  await page.goto('/register')
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/login$/)

  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/dashboard$/)

  const numberInputs = page.locator('input[type="number"]')
  await numberInputs.nth(0).fill('70')
  await numberInputs.nth(1).fill('170')
  await page.click('button[type="submit"]')

  await expect(page.locator('text=BMI:')).toBeVisible()
  await expect(page.locator('table')).toBeVisible()
})
