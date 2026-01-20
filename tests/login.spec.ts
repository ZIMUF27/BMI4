import { test, expect } from '@playwright/test'

test('เข้าสู่ระบบและไปหน้า Dashboard', async ({ page }) => {
  const username = `login_${Date.now()}`
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
  await expect(page.locator('text=BMI Dashboard')).toBeVisible()
})
