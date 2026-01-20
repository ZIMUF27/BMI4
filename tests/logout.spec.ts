import { test, expect } from '@playwright/test'

test('ออกจากระบบแล้วกลับไปหน้าแรก', async ({ page }) => {
  const username = `logout_${Date.now()}`
  const password = 'Passw0rd!'

  // Register
  await page.goto('/register')
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/login$/)

  // Login
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/dashboard$/)

  // Logout
  await page.click('text=Logout')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('h1')).toHaveText(/BMI Health Tracker/)
})
